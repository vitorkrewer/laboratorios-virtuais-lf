
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
            "/root": { type: "dir", children: ["flags.txt", "notes.md", "tools"] },
            "/root/tools": { type: "dir", children: ["exploit.py", "scan.sh"] },
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
            "/var/www/html/robots.txt": "User-agent: *\nDisallow: /admin/"
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
        }

        return `zsh: command not found: ${cmd}`;
    }

    // --- Comandos do Sistema ---

    cmdLs(args) {
        // Simplificado: apenas lista o dir atual ou o especificado (se absoluto)
        let targetPath = this.resolvePath(args[0] || ".");

        if (!this.fs[targetPath]) {
            return `ls: cannot access '${args[0]}': No such file or directory`;
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

    resolvePath(path) {
        if (path === ".") return this.cwd;
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

\x1b[3mType 'man <tool>' (not implemented yet) or '<tool> --help' for specific usage.\x1b[0m
`;
    }

    // --- Ferramentas ---

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
