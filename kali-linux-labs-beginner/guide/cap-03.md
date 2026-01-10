# **Capítulo 3: Vivendo em Harmonia (Instalação via WSL no Windows)**

Se você escolheu o caminho do Porto Seguro, prepare-se para a maneira mais fácil e rápida de ter o Kali Linux funcionando. Este método é ideal para quem quer as ferramentas do Kali sem abrir mão do conforto e da segurança do Windows.

## **Seção 3.1: O que é esse tal de "WSL"?**

WSL significa **Subsistema do Windows para Linux**. É uma ferramenta oficial da Microsoft que permite executar um ambiente Linux completo diretamente no Windows, sem a necessidade de criar uma máquina virtual pesada (como o VirtualBox) ou de fazer dual-boot.40

Pense nisso como uma camada de tradução mágica. Quando você digita um comando Linux no terminal do WSL, essa camada o traduz para algo que o Windows entende e executa.41 Nós usaremos a versão mais recente, o WSL 2, que na verdade usa uma máquina virtual extremamente leve e otimizada com um kernel Linux completo, oferecendo desempenho e compatibilidade muito superiores.18

## **Seção 3.2: Ativando os Superpoderes do Windows**

Antes de instalar o Kali, precisamos ativar o WSL no seu Windows.

* **Requisitos do Sistema:** Você precisa ter o Windows 10 (versão 1903, build 18362 ou superior) ou o Windows 11\.18  
* **O Comando Mágico:** A Microsoft tornou este processo incrivelmente simples.  
  1. Abra o **PowerShell como Administrador**. Para fazer isso, clique com o botão direito no menu Iniciar e selecione "Terminal (Admin)" ou "Windows PowerShell (Admin)".  
  2. Na janela do PowerShell, digite o seguinte comando e pressione Enter:  
     wsl \--install  
  3. É só isso\! Este único comando faz tudo o que é necessário: ativa os recursos "Plataforma de Máquina Virtual" e "Subsistema do Windows para Linux", baixa o kernel Linux mais recente e define o WSL 2 como padrão.19  
  4. Após a conclusão do comando, você precisará **reiniciar o seu computador**.

Embora guias mais antigos mostrem um processo manual com vários comandos dism.exe, o comando wsl \--install é o método moderno e recomendado, pois simplifica tudo e evita possíveis erros.

## **Seção 3.3: Instalação com Um Clique**

Com o WSL ativado e o computador reiniciado, instalar o Kali é tão fácil quanto instalar qualquer outro aplicativo.

1. Abra a **Microsoft Store** no seu Windows.46  
2. Na barra de pesquisa, digite **"Kali Linux"**.14  
3. Encontre o aplicativo oficial, publicado por "Kali Linux", e clique em "Obter" ou "Instalar".46  
4. Aguarde o download e a instalação serem concluídos.

Como alternativa, você pode instalar o Kali diretamente pelo PowerShell (Admin) com o comando: wsl \--install \-d kali-linux.20

## **Seção 3.4: Seu Primeiro "Olá" ao Kali no WSL**

Após a instalação, você pode iniciar o Kali de algumas maneiras:

* Abra o menu Iniciar e clique no ícone do "Kali Linux".  
* Abra o PowerShell ou o Prompt de Comando e simplesmente digite kali e pressione Enter.48

A primeira vez que você iniciar o Kali, ele levará alguns minutos para descompactar e configurar seus arquivos. Em seguida, ele fará uma pergunta muito importante:

* **Crie um nome de usuário e uma senha UNIX.** 48

Este nome de usuário e senha são **exclusivos para o ambiente Kali** e não precisam ser os mesmos da sua conta do Windows. Escolha um nome de usuário simples (por exemplo, "aluno") e uma senha que você não vá esquecer. Você não verá a senha sendo digitada na tela, isso é normal no Linux por segurança. Você precisará dessa senha para usar comandos sudo, que são comandos que exigem privilégios de administrador.

Ao contrário de imagens pré-construídas, neste método não há senha padrão; você cria a sua própria no primeiro uso.39 Após definir seu usuário e senha, você verá o prompt de comando do Kali. Bem-vindo ao seu novo ambiente\!