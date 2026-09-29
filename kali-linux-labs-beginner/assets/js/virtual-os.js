
/**
 * VirtualOS - Simula um sistema operacional básico e ferramentas de segurança
 * para o modo Playground do Laboratório Kali Linux.
 */

export class VirtualOS {
    constructor() {
        this.user = "root";
        this.hostname = "kali";
        this.cwd = "/root";

        // Sistema de Arquivos Virtual Simplificado
        this.fs = {
            "/": { type: "dir", children: ["root", "home", "usr", "tmp", "var"] },
            "/root": { type: "dir", children: ["flags.txt", "notes.md", "tools", "training"] },
            "/root/tools": { type: "dir", children: ["exploit.py", "scan.sh"] },
            "/root/training": { type: "dir", children: ["logs", "samples", "demo-api", "demo-repo", "rules"] },
            "/root/training/logs": { type: "dir", children: ["dns.log", "conn.log", "http.log", "eve.json"] },
            "/root/training/samples": { type: "dir", children: ["invoice_preview.txt", "telemetry_note.txt"] },
            "/root/training/demo-api": { type: "dir", children: ["routes", "config"] },
            "/root/training/demo-api/routes": { type: "dir", children: ["profile.js"] },
            "/root/training/demo-api/config": { type: "dir", children: ["app.js"] },
            "/root/training/demo-repo": { type: "dir", children: [".env.example", "config"] },
            "/root/training/demo-repo/config": { type: "dir", children: ["sample.yml"] },
            "/root/training/rules": { type: "dir", children: ["training.rules", "training_rules.yar"] },
            "/home": { type: "dir", children: ["kali"] },
            "/home/kali": { type: "dir", children: ["Desktop", "Downloads"] },
            "/var/www/html": { type: "dir", children: ["index.html", "robots.txt"] },
        };

        // Conteúdo dos arquivos
        this.files = {
            "/root/flags.txt": "CTF{w3lc0m3_t0_k4l1_l4bs}",
            "/root/notes.md": "# Pentest Notes\n\n- Target: 10.10.10.5\n- Vulnerability: SQL Injection found on /products.php",
            "/root/tools/exploit.py": "print('Exploiting target...')\n# TODO: Implement payload",
            "/root/tools/scan.sh": "#!/bin/bash\nnmap -sC -sV $1",
            "/var/www/html/robots.txt": "User-agent: *\nDisallow: /admin/",
            "/root/training/logs/dns.log": "2026-09-29T09:00:12Z\t10.20.0.15\tupdates.training.invalid\n2026-09-29T09:00:14Z\t10.20.0.15\tportal.learningfly.local",
            "/root/training/logs/conn.log": "10.20.0.15\t198.51.100.44\thttp\n10.20.0.15\t10.20.0.80\thttp",
            "/root/training/logs/http.log": "updates.training.invalid\t/check\tTrainingAgent/0.1\nportal.learningfly.local\t/status\tTrainingBrowser/1.0",
            "/root/training/logs/eve.json": "{\"event_type\":\"alert\",\"severity\":2,\"signature\":\"TRAINING Suspicious DNS domain\"}",
            "/root/training/samples/invoice_preview.txt": "TRAINING SAMPLE: PowerShell marker only. This file is inert.",
            "/root/training/samples/telemetry_note.txt": "TRAINING SAMPLE: Encoded command marker only. This file is inert.",
            "/root/training/demo-api/routes/profile.js": "logger.info(req.query.search); // training finding: redact user-controlled data",
            "/root/training/demo-api/config/app.js": "module.exports = { debug: true };",
            "/root/training/demo-repo/.env.example": "API_KEY=lf_demo_key_not_valid_123",
            "/root/training/demo-repo/config/sample.yml": "password: training_placeholder_not_valid",
            "/root/training/rules/training.rules": "alert dns any any -> any any (msg:\"TRAINING suspicious domain\"; dns.query; content:\"updates.training.invalid\"; sid:1000001; rev:1;)",
            "/root/training/rules/training_rules.yar": "rule TRAINING_Suspicious_PowerShell { strings: $a = \"PowerShell marker\" condition: $a }"
        };

        this.manpages = {
            wireshark: "WIRESHARK(1)\n\nNAME\n  wireshark - visual inspection of synthetic packet captures\n\nSAFE USAGE\n  wireshark -r campus-lab.pcap -Y dns\n  wireshark -r campus-lab.pcap -Y http.request\n\nThis lab reads bundled fictitious PCAP metadata only; no network interface is captured.",
            zeek: "ZEEK(1)\n\nNAME\n  zeek - network telemetry analysis\n\nSAFE USAGE\n  zeek-cut query < dns.log\n  zeek-cut id.orig_h id.resp_h service < conn.log\n\nUse structured logs to correlate evidence before making an incident decision.",
            suricata: "SURICATA(1)\n\nNAME\n  suricata - intrusion detection and rule validation\n\nSAFE USAGE\n  suricata -r soc-training.pcap -l alerts\n  suricata -T -S training.rules\n\nAlerts are hypotheses. Validate context and tune rules before enforcing them.",
            yara: "YARA(1)\n\nNAME\n  yara - classify files with rules\n\nSAFE USAGE\n  yara -m training_rules.yar samples/\n  yara -r training_rules.yar samples/\n\nOnly inert text samples are used in this lab.",
            osqueryi: "OSQUERYI(1)\n\nNAME\n  osqueryi - query endpoint telemetry using SQL\n\nSAFE USAGE\n  osqueryi \"SELECT pid, name FROM processes;\"\n  osqueryi \"SELECT username, shell FROM users;\"\n\nStart with a hypothesis and select only the needed fields.",
            lynis: "LYNIS(1)\n\nNAME\n  lynis - Linux hardening audit\n\nSAFE USAGE\n  lynis audit system\n  lynis show suggestions\n\nPrioritize remediation by exposure, impact, reversibility and operational risk.",
            trivy: "TRIVY(1)\n\nNAME\n  trivy - dependency and container risk analysis\n\nSAFE USAGE\n  trivy image learningfly/webapp:1.0\n  trivy image --severity HIGH learningfly/webapp:1.0\n\nA finding needs context: package version, exposure and fix availability.",
            semgrep: "SEMGREP(1)\n\nNAME\n  semgrep - static application security testing\n\nSAFE USAGE\n  semgrep --config auto demo-api\n  semgrep --config p/security-audit --json demo-api\n\nTreat findings as review leads, not automatic proof of a vulnerability.",
            gitleaks: "GITLEAKS(1)\n\nNAME\n  gitleaks - secret detection for Git repositories\n\nSAFE USAGE\n  gitleaks detect --source demo-repo\n  gitleaks protect --staged\n\nIf a real secret leaks: revoke it, remove it, then prevent recurrence in CI."
        };
    }

    process(command) {
        if (!command.trim()) return "";

        const parts = command.trim().split(/\s+/);
        const cmd = parts[0];
        const args = parts.slice(1);

        // Comandos do Sistema
        switch (cmd) {
            case "ls": return this.cmdLs(args);
            case "cd": return this.cmdCd(args);
            case "pwd": return this.cwd;
            case "cat": return this.cmdCat(args);
            case "whoami": return this.user;
            case "id": return "uid=0(root) gid=0(root) groups=0(root)";
            case "clear": return "IS_CLEAR_SIGNAL"; // Tratado pelo engine
            case "echo": return args.join(" ");
            case "history": return "1  ls\n2  whoami\n3  ip a"; // Estático por enquanto
            case "help": return this.cmdHelp();
            case "man": return this.cmdMan(args);
            case "which": return this.cmdWhich(args);
            case "tree": return this.cmdTree(args);
            case "head": return this.cmdHead(args);
            case "tail": return this.cmdTail(args);
            case "grep": return this.cmdGrep(args);
            case "find": return this.cmdFind(args);
            case "uname": return "Linux kali-training 6.8.0-learningfly #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux";
            case "ip": return this.cmdIp(args);
            case "ss": return this.cmdSs(args);
        }

        // Ferramentas de Segurança
        switch (cmd) {
            case "nmap": return this.toolNmap(args);
            case "sqlmap": return this.toolSqlmap(args);
            case "nikto": return this.toolNikto(args);
            case "nuclei": return this.toolNuclei(args);
            case "dnsx": return this.toolDnsx(args);
            case "burpsuite": return "Starting Burp Suite Community Edition...\n[+] Proxy listener started on 127.0.0.1:8080\n[+] Waiting for browser connection...";
            case "gobuster": return this.toolGobuster(args);
            case "msfconsole": return this.toolMsfconsole(args);
            case "hydra": return this.toolHydra(args);
            case "wireshark": return this.toolWireshark(args);
            case "trivy": return this.toolTrivy(args);
            case "semgrep": return this.toolSemgrep(args);
            case "gitleaks": return this.toolGitleaks(args);
            case "zeek": return this.toolZeek(args);
            case "suricata": return this.toolSuricata(args);
            case "yara": return this.toolYara(args);
            case "osqueryi": return this.toolOsquery(args);
            case "lynis": return this.toolLynis(args);
            case "zeek-cut": return this.toolZeekCut(args);
            case "jq": return this.toolJq(args);
        }

        return `zsh: command not found: ${cmd}`;
    }

    // --- Comandos do Sistema ---

    cmdLs(args) {
        // Flags de listagem sao visuais no simulador; o ultimo argumento nao-flag e o caminho.
        const targetArg = args.find(arg => !arg.startsWith("-")) || ".";
        let targetPath = this.resolvePath(targetArg);

        if (!this.fs[targetPath]) {
            return `ls: cannot access '${targetArg}': No such file or directory`;
        }

        const node = this.fs[targetPath];
        if (node.type !== "dir") return args[0]; // É arquivo

        return node.children.map(c => {
            const isDir = this.fs[targetPath === "/" ? "/" + c : targetPath + "/" + c]?.type === "dir";
            return isDir ? `\x1b[1;34m${c}\x1b[0m` : c; // Azul para diretórios
        }).join("  ");
    }

    cmdCd(args) {
        if (!args[0]) {
            this.cwd = "/root";
            return "";
        }

        let target = args[0];
        if (target === "..") {
            if (this.cwd === "/") return "";
            this.cwd = this.cwd.substring(0, this.cwd.lastIndexOf("/")) || "/";
            return "";
        }

        const newPath = this.resolvePath(target);
        if (this.fs[newPath] && this.fs[newPath].type === "dir") {
            this.cwd = newPath;
            return "";
        } else {
            return `cd: no such file or directory: ${target}`;
        }
    }

    cmdCat(args) {
        if (!args[0]) return "cat: missing operand";
        const path = this.resolvePath(args[0]);
        if (this.files[path]) return this.files[path];
        if (this.fs[path] && this.fs[path].type === 'dir') return `cat: ${args[0]}: Is a directory`;
        return `cat: ${args[0]}: No such file or directory`;
    }

    cmdMan(args) {
        const tool = (args[0] || "").toLowerCase();
        if (!tool) return "What manual page do you want? Try: man zeek, man trivy, man osqueryi";
        return this.manpages[tool] || `No training manual entry for '${tool}'. Use 'help' to list available commands.`;
    }

    cmdWhich(args) {
        if (!args[0]) return "which: missing argument";
        const tool = args[0];
        const known = ["nmap", "naabu", "dnsx", "nikto", "nuclei", "wireshark", "trivy", "semgrep", "gitleaks", "zeek", "suricata", "yara", "osqueryi", "lynis"];
        return known.includes(tool) ? `/usr/bin/${tool}` : `${tool} not found in training PATH`;
    }

    cmdTree(args) {
        const target = this.resolvePath(args.find(arg => !arg.startsWith("-")) || ".");
        if (!this.fs[target]) return `tree: ${target}: No such file or directory`;
        const lines = [target];
        const visit = (path, prefix = "") => {
            const node = this.fs[path];
            if (!node || node.type !== "dir") return;
            node.children.forEach((child, index) => {
                const isLast = index === node.children.length - 1;
                const childPath = path === "/" ? `/${child}` : `${path}/${child}`;
                lines.push(`${prefix}${isLast ? "└── " : "├── "}${child}`);
                if (this.fs[childPath]?.type === "dir") visit(childPath, `${prefix}${isLast ? "    " : "│   "}`);
            });
        };
        visit(target);
        return lines.join("\n");
    }

    cmdHead(args) {
        const file = args.find(arg => !arg.startsWith("-"));
        if (!file) return "head: missing file operand";
        const content = this.cmdCat([file]);
        if (content.startsWith("cat:")) return content.replace("cat:", "head:");
        return content.split("\n").slice(0, 10).join("\n");
    }

    cmdTail(args) {
        const file = args.find(arg => !arg.startsWith("-"));
        if (!file) return "tail: missing file operand";
        const content = this.cmdCat([file]);
        if (content.startsWith("cat:")) return content.replace("cat:", "tail:");
        return content.split("\n").slice(-10).join("\n");
    }

    cmdGrep(args) {
        const plainArgs = args.filter(arg => !arg.startsWith("-"));
        const pattern = plainArgs[0];
        const file = plainArgs[1];
        if (!pattern || !file) return "Usage: grep <pattern> <training-file>";
        const content = this.cmdCat([file]);
        if (content.startsWith("cat:")) return content.replace("cat:", "grep:");
        const matches = content.split("\n").filter(line => line.toLowerCase().includes(pattern.toLowerCase()));
        return matches.length ? matches.join("\n") : "grep: no matching lines in the synthetic training file";
    }

    cmdFind(args) {
        const start = this.resolvePath(args[0] || ".");
        const nameIndex = args.indexOf("-name");
        const needle = nameIndex >= 0 ? (args[nameIndex + 1] || "").replace(/["'*]/g, "") : "";
        const files = Object.keys(this.files).filter(path => path.startsWith(start) && (!needle || path.toLowerCase().includes(needle.toLowerCase())));
        return files.length ? files.join("\n") : "find: no matching training artifacts";
    }

    cmdIp(args) {
        if (args[0] === "a" || args[0] === "addr") {
            return "1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: eth0: <BROADCAST,MULTICAST,UP> mtu 1500\n    inet 10.20.0.15/24 brd 10.20.0.255 scope global eth0\n\n[SIMULATED] Endpoint addressing from the isolated training network.";
        }
        return "Usage: ip a (shows a synthetic interface inventory)";
    }

    cmdSs(args) {
        return "Netid  State   Local Address:Port\ntcp    LISTEN  0.0.0.0:22\ntcp    LISTEN  127.0.0.1:631\n\n[SIMULATED] Review listening services against the approved baseline.";
    }

    resolvePath(path) {
        if (path === ".") return this.cwd;
        if (path === "~") return "/root";
        if (path.startsWith("~/")) return `/root/${path.slice(2)}`;
        if (path.startsWith("/")) return path; // Absoluto
        return this.cwd === "/" ? `/${path}` : `${this.cwd}/${path}`; // Relativo simples
    }

    cmdHelp() {
        return `
\x1b[1;32mKali Linux Lab - Help Menu\x1b[0m

\x1b[1;34mSystem Commands:\x1b[0m
  ls, cd, pwd, cat, echo, clear, whoami, id

\x1b[1;34mSecurity Tools:\x1b[0m
  \x1b[1mnmap\x1b[0m       Network Scanner
  \x1b[1msqlmap\x1b[0m     SQL Injection Tool
  \x1b[1mnikto\x1b[0m      Web Server Scanner
  \x1b[1mnuclei\x1b[0m     Vulnerability Scanner
  \x1b[1mgobuster\x1b[0m   Directory Brute-forcing
  \x1b[1mdnsx\x1b[0m       DNS Utility
  \x1b[1mburpsuite\x1b[0m  Web Proxy Application

\x1b[1;32mDefensive Security Tools (simulated):\x1b[0m
  \x1b[1mwireshark\x1b[0m   Read-only PCAP analysis in training datasets
  \x1b[1mtrivy\x1b[0m       Dependency and container risk analysis
  \x1b[1msemgrep\x1b[0m     Static application security testing (SAST)
  \x1b[1mgitleaks\x1b[0m    Secret exposure prevention for Git repositories
    \x1b[1mzeek\x1b[0m        Network telemetry and structured investigation logs
    \x1b[1msuricata\x1b[0m    IDS alert analysis and rule validation
    \x1b[1myara\x1b[0m        Safe artifact classification with training rules
    \x1b[1mosqueryi\x1b[0m    Endpoint investigation with SQL-style queries
    \x1b[1mlynis\x1b[0m       Linux hardening assessment and recommendations

\x1b[3mType 'man <tool>' or '<tool> --help' for safe syntax, examples and learning objectives.\x1b[0m
`;
    }

    // --- Ferramentas ---

    toolWireshark(args) {
        if (args.length === 0 || args.includes("--help")) {
            return "Wireshark training simulator\nUsage: wireshark -r <training-capture.pcap> [-Y <display-filter>]\nNote: only bundled synthetic captures are available.";
        }
        const filter = args.includes("-Y") ? args[args.indexOf("-Y") + 1] : "all";
        if (filter === "dns") {
            return "[SIMULATED PCAP] DNS display filter\n10.20.0.15 -> 10.20.0.53  query A portal.learningfly.local\n10.20.0.53 -> 10.20.0.15  response A 10.20.0.80\n\n[DEFENSIVE NOTE] Document expected domains and investigate unexpected resolvers.";
        }
        if (filter === "http.request") {
            return "[SIMULATED PCAP] HTTP request display filter\nGET /status HTTP/1.1\nHost: portal.learningfly.local\n\n[DEFENSIVE NOTE] Inspect metadata and avoid collecting credentials or private payloads.";
        }
        return "[SIMULATED WIRESHARK] Loaded campus-lab.pcap (1,248 packets)\nUse -Y dns or -Y http.request to practice safe display filtering.";
    }

    toolTrivy(args) {
        if (args.length === 0 || args.includes("--help")) return "Usage: trivy image [--severity HIGH,CRITICAL] <training-image>\nOnly local simulated image metadata is analyzed.";
        const highOnly = args.includes("--severity") && args[args.indexOf("--severity") + 1]?.includes("HIGH");
        if (highOnly) return "learningfly/webapp:1.0 (training image)\nHIGH: 1\nopenssl  CVE-TRAIN-01  Fixed Version: 3.0.15\n\n[REMEDIATION] Update the base image, rebuild and rescan in CI.";
        return "learningfly/webapp:1.0 (training image)\nTotal findings: 3 (HIGH: 1, MEDIUM: 2)\n- openssl   CVE-TRAIN-01 HIGH\n- libxml2   CVE-TRAIN-02 MEDIUM\n- curl      CVE-TRAIN-03 MEDIUM\n\n[LEARNING] Prioritize by exposure, exploitability and available fix.";
    }

    toolSemgrep(args) {
        if (args.length === 0 || args.includes("--help")) return "Usage: semgrep --config <ruleset> <training-source>\nStatic analysis is performed on isolated fictitious source files.";
        if (args.includes("--json")) return '{"results":[{"check_id":"training.unsafe-logging","severity":"WARNING","path":"demo-api/routes/profile.js","line":18}],"errors":[]}';
        return "Scanning 12 files in demo-api (simulated)\n2 findings detected:\n- routes/profile.js:18 user-controlled content logged without redaction [MEDIUM]\n- config/app.js:7 debug mode enabled in production profile [LOW]\n\n[LEARNING] Confirm context before treating a static-analysis finding as a confirmed vulnerability.";
    }

    toolGitleaks(args) {
        if (args.length === 0 || args.includes("--help")) return "Usage: gitleaks detect --source <training-repository>\nAll findings in this lab are synthetic and invalid.";
        if (args.includes("protect")) return "Scanning staged changes (simulated)\nNo secrets detected.\n\n[PASS] Prevention control would allow the training commit.";
        return "Scanning demo-repo history (simulated)\nFinding: generic API key in .env.example:4 [SYNTHETIC]\nFinding: password assignment in config/sample.yml:9 [SYNTHETIC]\n\n[REMEDIATION] Revoke real secrets, remove them from code and add secret scanning to CI.";
    }

    toolZeek(args) {
        if (args.length === 0 || args.includes("--help")) return "Usage: zeek-cut < fields < training.log\nOnly synthetic Zeek logs are available in this playground.";
        return "#fields\tts\tid.orig_h\tquery\n2026-09-29T09:00:12Z\t10.20.0.15\tupdates.training.invalid\n2026-09-29T09:00:14Z\t10.20.0.15\tportal.learningfly.local\n\n[DEFENSIVE NOTE] Correlate DNS, connection and HTTP logs before escalating an alert.";
    }

    toolSuricata(args) {
        if (args.includes("-T")) return "Suricata configuration test mode (simulated)\n[PASS] training.rules syntax is valid.\n[LEARNING] Validate signatures before deploying to production.";
        return "[SIMULATED SURICATA]\nalert: ET TRAINING Suspicious DNS domain | severity: 2 | src: 10.20.0.15\nalert: ET TRAINING Unusual HTTP user-agent | severity: 3 | src: 10.20.0.15\n\n[TRIAGE] Alerts need correlation and context; they are not proof by themselves.";
    }

    toolYara(args) {
        if (args.length === 0 || args.includes("--help")) return "Usage: yara [-m|-r] <training_rules.yar> <synthetic-samples/>\nNo executable or malicious sample is present.";
        return "TRAINING_Suspicious_PowerShell samples/invoice_preview.txt\nTRAINING_Encoded_Command samples/telemetry_note.txt\n\n[ANALYST NOTE] Confirm origin, prevalence and execution history before classification.";
    }

    toolOsquery(args) {
        if (args.length === 0 || args.includes("--help")) return "Usage: osqueryi \"SELECT columns FROM endpoint_table;\"\nThis mode queries a synthetic endpoint inventory.";
        if (args.join(' ').includes('users')) return "+----------+------+-----------+\n| username | uid  | shell     |\n+----------+------+-----------+\n| kali     | 1000 | /bin/bash |\n| analyst  | 1001 | /bin/bash |\n+----------+------+-----------+";
        if (args.join(' ').includes('systemd_units')) return "+-----------------------+---------+\n| name                  | status  |\n+-----------------------+---------+\n| ssh.service           | running |\n| training-agent.service| running |\n+-----------------------+---------+";
        return "+------+---------+----------------------------+\n| pid  | name    | path                       |\n+------+---------+----------------------------+\n| 1421 | python3 | /usr/bin/python3           |\n| 1834 | python3 | /opt/training/collector.py |\n+------+---------+----------------------------+";
    }

    toolLynis(args) {
        if (args.includes("suggestions")) return "Suggestions (synthetic):\n- Disable direct root login over SSH.\n- Enable automatic security updates.\n- Review file permissions in /opt/training.";
        if (args.includes("profile")) return "Profile: learningfly-training-linux\nHardening index: 68\nCritical findings: 0\nWarnings: 1\nSuggestions: 3";
        return "[ Lynis 3.1.1 - Training Profile ]\nHardening index: 68 [##########------]\nWarnings: 1\nSuggestions: 3\n\n[WARNING] SSH root login policy is not explicitly disabled in the training profile.";
    }

    toolZeekCut(args) {
        const fields = args.filter(arg => !["<", "dns.log", "conn.log", "http.log"].includes(arg));
        const requested = fields.length ? fields : ["query"];
        const isConnectionLog = args.includes("conn.log");
        const isHttpLog = args.includes("http.log");
        if (isConnectionLog) {
            return `#fields\t${requested.join("\t")}\n10.20.0.15\t198.51.100.44\thttp\n10.20.0.15\t10.20.0.80\thttp\n\n[TRAINING] Connection telemetry can be correlated with DNS and HTTP events.`;
        }
        if (isHttpLog) {
            return `#fields\t${requested.join("\t")}\nupdates.training.invalid\t/check\tTrainingAgent/0.1\nportal.learningfly.local\t/status\tTrainingBrowser/1.0\n\n[TRAINING] Preserve the minimum evidence needed for the investigation.`;
        }
        return `#fields\t${requested.join("\t")}\nupdates.training.invalid\nportal.learningfly.local\n\n[TRAINING] The first domain is the synthetic indicator used by this scenario.`;
    }

    toolJq(args) {
        if (args.length === 0 || args.includes("--help")) return "Usage: jq '<filter>' < training.json\nThis sandbox supports the EVE JSON training example.";
        if (args.join(" ").includes("severity")) {
            return `{\n  "event_type": "alert",\n  "alert": {"signature": "ET TRAINING Suspicious DNS domain", "severity": 2},\n  "src_ip": "10.20.0.15"\n}\n\n[TRAINING] Filter results should be correlated with surrounding context, not treated as a final verdict.`;
        }
        return `{\n  "event_type": "alert",\n  "alert": {"signature": "ET TRAINING Suspicious DNS domain", "severity": 2}\n}`;
    }

    toolNmap(args) {
        if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
            return `Nmap 7.94 ( https://nmap.org )\nUsage: nmap [Scan Type(s)] [Options] {target specification}`;
        }

        const target = args[args.length - 1];
        const ports = args.includes("-p-") ? "65535 scanned ports" : "1000 scanned ports";

        return `Starting Nmap 7.94 at 2024-01-15 10:00 UTC
Nmap scan report for ${target} (192.168.1.105)
Host is up (0.0004s latency).
Not shown: 996 closed ports
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 2.45 seconds`;
    }

    toolSqlmap(args) {
        if (args.length === 0 || args.includes("-h")) return "Usage: sqlmap -u <url> [options]";
        if (!args.includes("-u")) return "sqlmap: error: missing argument -u";

        const url = args[args.indexOf("-u") + 1];

        let output = `        ___
       __H__
 ___ ___[.]_____ ___ ___  {1.7.12#stable}
|_ -| . ["]     | .'| . |
|___|_  ["]_|_|_|__,|  _|
      |_|V...       |_|   http://sqlmap.org

[*] starting at 10:00:00
[INFO] testing connection to the target URL
[INFO] check if parameter is dynamic
`;

        if (args.includes("--dbs")) {
            output += `[INFO] the back-end DBMS is MySQL
available databases [2]:
[*] information_schema
[*] app_db`;
        } else {
            output += `[INFO] GET parameter 'id' appears to be 'MySQL > 5.0.11' injection point
[INFO] parameter 'id' is vulnerable. Do you want to keep testing? [y/N] N`;
        }
        return output;
    }

    toolNikto(args) {
        if (args.length === 0) return "Global options:\n   -h  Host to scan";
        const targetHostIndex = args.indexOf("-h") + 1;
        const target = targetHostIndex > 0 ? args[targetHostIndex] : "unknown";

        return `- Nikto v2.1.6
---------------------------------------------------------------------------
+ Target IP:          192.168.1.105
+ Target Hostname:    ${target}
+ Target Port:        80
---------------------------------------------------------------------------
+ Server: Apache/2.4.41 (Ubuntu)
+ /admin/: Directory indexing found.
+ /config.php: PHP config file found.
+ 7915 items checked: 0 error(s) and 2 item(s) reported on remote host`;
    }

    toolNuclei(args) {
        if (args.length === 0) return "Nuclei - Fuzzing Tool\nUsage: nuclei -u <target>";
        const targetIndex = args.indexOf("-u") + 1;
        const target = targetIndex > 0 ? args[targetIndex] : "unknown";

        return `[INF] Loading templates...
[INF] Loaded 300 templates
[2024-01-15 10:05:01] [tech-detect] [http] [info] ${target} [nginx]
[2024-01-15 10:05:02] [cve-2023-1234] [http] [low] ${target}/login.php`;
    }

    toolDnsx(args) {
        return "example.com [192.168.1.10]\nsub.example.com [192.168.1.11]";
    }

    toolGobuster(args) {
        return `
===============================================================
Gobuster v3.1.0
by OJ Reeves (@TheColonial) & Christian Mehlmauer (@firefart)
===============================================================
[+] Url:                     http://target.com
[+] Method:                  GET
[+] Threads:                 10
[+] Wordlist:                /usr/share/wordlists/dirb/common.txt
===============================================================
2024/01/15 10:10:00 Starting gobuster in directory enumeration mode
===============================================================
/admin                (Status: 301) [Size: 178] [--> http://target.com/admin/]
/images               (Status: 301) [Size: 178] [--> http://target.com/images/]
/index.php            (Status: 200) [Size: 1425]
/robots.txt           (Status: 200) [Size: 45]
===============================================================
Finished
===============================================================`;
    }

    toolMsfconsole(args) {
        return `
     ,           ,
    /             \\
   ((__---,,,---__))
      (_) O O (_)_________
         \\ _ /            |\\
          o_o \\   M S F   | \\
               \\   _____  |  *
                |||   WW|||
                |||     |||


       =[ metasploit v6.0.0-dev                           ]
+ -- --=[ 2048 exploits - 1105 auxiliary - 344 post       ]
+ -- --=[ 562 payloads - 45 encoders - 10 nops            ]
+ -- --=[ 7 evasion                                       ]

Metasploit tip: Use the 'search' command to find modules

msf6 > (Interactive mode not fully supported in Playground yet. Try the Metasploit Lab module!)`;
    }

    toolHydra(args) {
        if (args.length === 0) return "Hydra v9.1 (c) 2020 by van Hauser/THC\nSyntax: hydra [[[-l LOGIN|-L FILE] [-p PASS|-P FILE]] | [-C FILE]] [-e nsr] [-o FILE] [-t TASKS] [-M FILE [-T TASKS]] [-w TIME] [-W TIME] [-f] [-s PORT] [-x MIN:MAX:CHARSET] [-c TIME] [-ISOuvVd46] [service://server[:PORT][/OPT]]";

        return `Hydra v9.1 (c) 2020 by van Hauser/THC

[DATA] max 16 tasks per 1 server, overall 16 tasks, 100 login tries
[DATA] attacking service://${args[args.length - 1] || 'target'}/
[ssh] host: ${args[args.length - 2] || 'target'}   login: root   password: 123456
1 of 1 target successfully completed, 1 valid password found`;
    }
}
