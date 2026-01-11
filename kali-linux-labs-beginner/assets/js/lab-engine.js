
import { data as nmapData } from './scenarios/nmap.js';
import { data as naabuData } from './scenarios/naabu.js';
import { data as maltegoData } from './scenarios/maltego.js';
import { data as dnsxData } from './scenarios/dnsx.js';
import { data as nucleiData } from './scenarios/nuclei.js';
import { data as niktoData } from './scenarios/nikto.js';
import { data as burpData } from './scenarios/burpsuite.js';
import { data as sqlmapData } from './scenarios/sqlmap.js';
import { data as msfData } from './scenarios/msfconsole.js';
import { data as hydraData } from './scenarios/hydra.js';
import { data as playgroundData } from './scenarios/playground.js';
import { wikiData } from './wiki/data.js';
import { VirtualOS } from './virtual-os.js';

const scenarios = {
    nmap: nmapData,
    naabu: naabuData,
    maltego: maltegoData,
    dnsx: dnsxData,
    nuclei: nucleiData,
    nikto: niktoData,
    burpsuite: burpData,
    sqlmap: sqlmapData,
    msfconsole: msfData,
    hydra: hydraData,
    playground: playgroundData
};

class LabEngine {
    constructor() {
        this.term = null;
        this.fitAddon = null;
        this.currentScenario = null;
        this.currentStep = 0;
        this.commandBuffer = '';
        this.history = [];
        this.historyIndex = -1;
        // Prompt style: user (red) + host + path (blue) + symbol
        this.promptStr = '\x1b[1;31mroot@kali\x1b[0m:\x1b[1;34m~\x1b[0m# ';

        this.ui = {
            title: document.getElementById('lab-title'),
            intro: document.getElementById('lab-intro'),
            stepNum: document.getElementById('current-step-num'),
            totalSteps: document.getElementById('total-steps'),
            instruction: document.getElementById('step-instruction'),
            commandDisplay: document.getElementById('step-command'), // The visual display in sidebar
            hintBox: document.getElementById('hint-box'),
            hintText: document.getElementById('step-hint'),
            feedback: document.getElementById('feedback-area'),
            nextBtn: document.getElementById('next-btn')
        };

        // Initialize VirtualOS
        this.os = new VirtualOS();
    }

    init() {
        // 1. Get Tool ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const toolId = urlParams.get('tool');

        if (!toolId || !scenarios[toolId]) {
            alert('Cenário não encontrado ou inválido.');
            window.location.href = '../labs.html';
            return;
        }

        this.currentScenario = scenarios[toolId];

        // 2. Initialize UI & Terminal
        this.updateUI();
        this.initTerminal();
        this.bindEvents();
    }

    updateUI() {
        const scenario = this.currentScenario;

        // Header
        this.ui.title.innerText = scenario.title;

        if (scenario.id === 'playground') {
            this.renderPlaygroundUI();
            return;
        }

        const step = scenario.steps[this.currentStep];

        // Step Info
        if (this.currentStep === 0) {
            this.ui.intro.innerHTML = scenario.intro;
        }

        this.ui.stepNum.innerText = this.currentStep + 1;
        this.ui.totalSteps.innerText = scenario.steps.length;
        this.ui.instruction.innerHTML = step.instruction;
        this.ui.commandDisplay.innerText = step.command;

        if (step.hint) {
            this.ui.hintBox.classList.remove('hidden');
            this.ui.hintText.innerText = step.hint;
        } else {
            this.ui.hintBox.classList.add('hidden');
        }

        this.ui.feedback.classList.add('hidden');
    }

    renderPlaygroundUI() {
        // Custom UI for playground
        this.ui.intro.innerHTML = this.currentScenario.intro;

        // Hide Step counters/specifics
        // We modify the DOM structure slightly to fit the playground mode
        // Reuse instruction area

        const stepTitle = document.querySelector('h3');
        if (stepTitle) stepTitle.innerText = "Guia Rápido";

        this.ui.instruction.innerHTML = "Clique nos comandos abaixo para inseri-los no terminal.";
        if (this.ui.commandDisplay && this.ui.commandDisplay.parentElement) {
            this.ui.commandDisplay.parentElement.classList.add('hidden');
        }
        if (this.ui.hintBox) this.ui.hintBox.classList.add('hidden');
        if (this.ui.feedback) this.ui.feedback.classList.add('hidden');

        // Create or Update a reference list
        let refList = document.getElementById('playground-ref');
        if (!refList) {
            refList = document.createElement('div');
            refList.id = 'playground-ref';
            refList.className = 'mt-6 space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2';

            // Populate from Wiki
            wikiData.forEach(item => {
                const div = document.createElement('div');
                div.className = 'bg-gray-800/30 p-2 rounded border border-gray-700 hover:border-blue-500 cursor-pointer transition-colors text-xs font-mono text-gray-400 hover:text-white flex justify-between group';
                div.innerHTML = `<span>${item.command}</span> <span class="text-blue-500 opacity-0 group-hover:opacity-100">RUN</span>`;
                div.onclick = () => {
                    this.term.focus();
                    this.clearInputLine();
                    this.commandBuffer = '';
                    this.autoType(item.command);
                };
                refList.appendChild(div);
            });

            this.ui.instruction.parentElement.appendChild(refList);
        }
    }

    initTerminal() {
        // Create Terminal Instance
        this.term = new Terminal({
            cursorBlink: true,
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            fontWeight: 500,
            allowTransparency: true,
            theme: {
                background: '#0c0c0c',
                foreground: '#cccccc',
                green: '#39d353',
                blue: '#58a6ff',
                red: '#ff7b72',
                yellow: '#d29922',
                cursor: '#ffffff'
            }
        });

        // Load Addon
        this.fitAddon = new FitAddon.FitAddon();
        this.term.loadAddon(this.fitAddon);

        // Open Terminal
        this.term.open(document.getElementById('terminal-container'));
        this.fitAddon.fit();

        // Welcome Message
        this.term.writeln('\x1b[1;32mKali Linux Lab Environment [Version 2024.1]\x1b[0m');
        this.term.writeln('Connected to simulated instance. Type your commands below.');
        this.term.writeln('');

        this.promptUser();
        this.term.focus();

        // Input Handling (Key events)
        this.term.onData(e => this.handleInput(e));

        // Resize Listener
        window.addEventListener('resize', () => this.fitAddon.fit());
    }

    handleInput(e) {
        switch (e) {
            case '\r': // Enter
                this.term.write('\r\n');
                this.processCommand();
                break;
            case '\u007F': // Backspace
                if (this.commandBuffer.length > 0) {
                    this.commandBuffer = this.commandBuffer.slice(0, -1);
                    this.term.write('\b \b');
                }
                break;
            case '\u0003': // Ctrl+C
                this.term.write('^C\r\n');
                this.commandBuffer = '';
                this.promptUser();
                break;
            case '\u000C': // Ctrl+L
                this.term.clear();
                this.promptUser();
                // If there was content in buffer, restore it
                if (this.commandBuffer.length > 0) {
                    this.term.write(this.commandBuffer);
                }
                break;
            case '\x1b[A': // Up Arrow (History)
                if (this.history.length > 0) {
                    if (this.historyIndex < this.history.length - 1) {
                        this.historyIndex++;
                    }
                    this.setCommandBufferToHistory();
                }
                break;
            case '\x1b[B': // Down Arrow
                if (this.historyIndex > -1) {
                    this.historyIndex--;
                    if (this.historyIndex === -1) {
                        this.clearInputLine();
                        this.commandBuffer = '';
                    } else {
                        this.setCommandBufferToHistory();
                    }
                }
                break;
            default:
                // Normal typing (printable characters)
                if (e.length === 1 && e.charCodeAt(0) >= 32) {
                    this.commandBuffer += e;
                    this.term.write(e);
                }
        }
    }

    setCommandBufferToHistory() {
        // Calculate the actual index in the history array (reverse order logic essentially)
        // history = [cmd1, cmd2, cmd3]
        // historyIndex 0 = cmd3 (latest)
        const cmd = this.history[this.history.length - 1 - this.historyIndex];

        this.clearInputLine();
        this.commandBuffer = cmd;
        this.term.write(cmd);
    }

    clearInputLine() {
        // Erase current line content visually
        // Move cursor to beginning of line, then clear to end
        // But we have a prompt...
        // Use logic: carriage return (move to start), move right X times (prompt len), clear to right

        // Simpler approach:
        // Delete backward length of buffer
        let backspaces = '';
        for (let i = 0; i < this.commandBuffer.length; i++) {
            backspaces += '\b \b';
        }
        this.term.write(backspaces);
    }

    // Deletes everything visually and resets buffer (internal helper)
    // Actually, properly handling prompt + buffer replacement is tricky in xterm without keeping track of cursor.
    // My clearInputLine using backspaces is robust enough for this simple shell.

    promptUser() {
        // Dynamic prompt based on CWD if in Playground
        if (this.currentScenario && this.currentScenario.id === 'playground') {
            // Make sure cwd is updated if it exists
            const cwd = this.os ? this.os.cwd : '~';
            // Shorten path for prompt niceness logic could go here
            let displayPath = cwd === '/root' ? '~' : cwd;

            // Update the prompt string instance var
            this.promptStr = `\x1b[1;31mroot@kali\x1b[0m:\x1b[1;34m${displayPath}\x1b[0m# `;
        }
        this.term.write(this.promptStr);
    }

    processCommand() {
        // Normalize input
        const input = this.commandBuffer.trim().replace(/\s+/g, ' '); // remove extra spaces

        // Add to history if not empty
        if (input) {
            this.history.push(input);
            this.historyIndex = -1; // Reset history pointer
        }

        this.commandBuffer = ''; // Clear buffer

        // Empty command
        if (!input) {
            this.promptUser();
            return;
        }

        // Clear command
        if (input === 'clear') {
            this.term.clear();
            this.promptUser();
            return;
        }

        // Playground Mode Handler
        if (this.currentScenario.id === 'playground') {

            // 1. Process via VirtualOS
            const output = this.os.process(input);

            if (output === "IS_CLEAR_SIGNAL") {
                this.term.clear();
                this.promptUser();
                return;
            }

            if (output || output === "") {
                // Run output simulation (handles both text and empty string for correct prompting)
                // If text is empty (e.g. successful cd), runSimulationOutput handles it? 
                // No, runSimulationOutput splits lines. 

                if (output === "") {
                    this.promptUser();
                } else {
                    this.runSimulationOutput(output);
                }
            }
            return;
        }

        // Normal Lab Mode
        const expected = this.currentScenario.steps[this.currentStep].command.trim().replace(/\s+/g, ' ');

        // Command Validation
        if (input === expected) {
            this.runSuccessSimulation();
        } else {
            // Error handling
            this.term.writeln(`\x1b[31mzsh: command not found or incorrect: ${input}\x1b[0m`);
            // Check if user is trying a command from a different step?
            // For now, simple error.
            this.term.writeln(`\x1b[90mHint: The required command is: \x1b[0m${expected}`);
            this.term.writeln('');
            this.promptUser();
        }
    }

    runSimulationOutput(output) {
        const outputLines = output.split('\n');
        let i = 0;
        const printLine = () => {
            if (i < outputLines.length) {
                this.term.writeln(outputLines[i]);
                i++;
                setTimeout(printLine, 10);
            } else {
                this.term.writeln('');
                this.promptUser();
            }
        };
        printLine();
    }

    runSuccessSimulation() {
        const step = this.currentScenario.steps[this.currentStep];

        // Simulate output streaming
        const outputLines = step.output.split('\n');

        // Typing speed logic
        // We print lines, not chars, to be faster but still "animated"
        let i = 0;
        const printLine = () => {
            if (i < outputLines.length) {
                this.term.writeln(outputLines[i]);
                i++;
                // Random delay between 10ms and 50ms for realism
                setTimeout(printLine, Math.random() * 40 + 10);
            } else {
                this.term.writeln('');
                this.promptUser();
                this.showSuccessFeedback();
            }
        };

        printLine();
    }

    showSuccessFeedback() {
        this.ui.feedback.classList.remove('hidden');

        // Scroll sidebar to bottom to ensure feedback is visible
        const sidebar = this.ui.feedback.parentElement.parentElement;
        sidebar.scrollTop = sidebar.scrollHeight;

        if (this.currentStep < this.currentScenario.steps.length - 1) {
            this.ui.nextBtn.innerText = "Próximo Passo";
            this.ui.nextBtn.onclick = () => this.nextStep();
        } else {
            this.ui.nextBtn.innerText = "Concluir Módulo";
            this.ui.nextBtn.onclick = () => {
                // Celebration
                this.term.writeln('\x1b[1;32m[+] MODULE COMPLETED SUCCESSFULLY!\x1b[0m');
            };
        }
    }

    nextStep() {
        this.currentStep++;
        this.term.clear();
        this.term.writeln('\x1b[32m[*] Iniciando próximo passo...\x1b[0m');
        this.term.writeln('');
        this.promptUser();
        this.updateUI();
    }

    bindEvents() {
        // Optional: click on code block to auto-type
        // We find the code container in sidebar
        const codeBlock = this.ui.commandDisplay.parentElement;

        codeBlock.onclick = () => {
            // Auto-type logic
            const expected = this.currentScenario.steps[this.currentStep].command;

            // Only type if buffer is empty to avoid mess
            if (this.commandBuffer.length === 0) {
                this.autoType(expected);
            }
        };
    }

    autoType(text) {
        let i = 0;
        const typeChar = () => {
            if (i < text.length) {
                const char = text.charAt(i);
                this.commandBuffer += char;
                this.term.write(char);
                i++;
                setTimeout(typeChar, 30); // Fast typing
            }
        };
        typeChar();
        this.term.focus();
    }
}

// Start Engine
document.addEventListener('DOMContentLoaded', () => {
    const engine = new LabEngine();
    engine.init();
});
