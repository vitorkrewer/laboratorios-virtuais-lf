document.addEventListener('DOMContentLoaded', () => {
    const progressKey = 'learningfly-kali-completed-modules';
    const defensiveModules = ['wireshark', 'trivy', 'semgrep', 'gitleaks', 'zeek', 'suricata', 'yara', 'osquery', 'lynis'];
    const countElement = document.getElementById('defensive-progress-count');
    const barElement = document.getElementById('defensive-progress-bar');
    const resetButton = document.getElementById('reset-defensive-progress');
    const trackMap = {
        foundations: ['wireshark', 'trivy', 'osquery', 'lynis', 'nmap', 'dnsx'],
        soc: ['wireshark', 'zeek', 'suricata', 'yara', 'lynis'],
        appsec: ['semgrep', 'gitleaks', 'trivy', 'burpsuite', 'sqlmap', 'nikto', 'nuclei']
    };

    function renderProgress() {
        let completed = [];
        try {
            completed = JSON.parse(localStorage.getItem(progressKey) || '[]');
        } catch (error) {
            completed = [];
        }

        const total = defensiveModules.length;
        const count = defensiveModules.filter(id => completed.includes(id)).length;
        const percentage = Math.round((count / total) * 100);

        if (countElement) countElement.textContent = `${count} / ${total} módulos concluídos`;
        if (barElement) barElement.style.width = `${percentage}%`;

        document.querySelectorAll('[data-defensive-module]').forEach(card => {
            const isComplete = completed.includes(card.dataset.defensiveModule);
            const badge = card.querySelector('[data-module-status]');
            if (badge) {
                badge.textContent = isComplete ? '✓ Concluído' : 'Disponível';
                badge.className = isComplete
                    ? 'text-[10px] px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 font-bold'
                    : 'text-[10px] px-2 py-1 rounded-full bg-gray-700 text-gray-300 border border-gray-600 font-bold';
            }
            card.classList.toggle('ring-1', isComplete);
            card.classList.toggle('ring-green-500/40', isComplete);
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            localStorage.removeItem(progressKey);
            renderProgress();
        });
    }

    document.querySelectorAll('.track-filter-btn').forEach(button => {
        button.addEventListener('click', () => {
            const selectedTrack = button.dataset.track;
            const allowedTools = trackMap[selectedTrack] || [];
            const catalog = document.getElementById('tools-catalog');

            document.querySelectorAll('#tools-catalog a[href*="terminal.html?tool="]').forEach(card => {
                const tool = new URL(card.href).searchParams.get('tool');
                card.classList.toggle('hidden', selectedTrack !== 'all' && !allowedTools.includes(tool));
            });

            catalog?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    renderProgress();
});
