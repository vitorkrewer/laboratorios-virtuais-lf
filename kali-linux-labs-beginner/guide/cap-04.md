# **Capítulo 4: Bem-vindo ao Seu Novo Território \- Passos Essenciais Pós-Instalação**

A instalação foi um sucesso\! Mas antes de mergulhar de cabeça nas ferramentas, há alguns passos importantes que devemos tomar para garantir que sua nova base de operações esteja pronta para a ação.

## **Seção 4.1: Explorando Sua Nova Área de Trabalho (XFCE) (Para Usuários de Instalação Pura)**

Se você instalou o Kali no modo "Bare Metal", você será recebido pela área de trabalho XFCE. Desde 2019, o XFCE é o ambiente padrão do Kali por ser leve, rápido e limpo, permitindo que os recursos do seu computador sejam usados para o que realmente importa: as ferramentas de segurança.8

Vamos fazer um rápido tour:

* **Menu de Aplicativos (Canto Superior Esquerdo):** O ícone do dragão do Kali. Clicar aqui revela o arsenal completo do Kali, com centenas de ferramentas organizadas por categorias como "Coleta de Informações", "Análise de Vulnerabilidades", "Ataques a Senhas", etc..53  
* **Gerenciador de Arquivos:** O ícone de pasta que permite navegar pelos seus arquivos e diretórios.  
* **Emulador de Terminal:** O ícone de tela preta. Este é o seu centro de comando, a ferramenta mais importante e poderosa do seu sistema. Você passará muito tempo aqui.  
* **Alternador de Áreas de Trabalho:** Permite que você organize suas janelas em diferentes áreas de trabalho virtuais, mantendo seu ambiente organizado.  
* **Opções do Sistema (Canto Superior Direito):** Aqui você encontrará informações de rede, controle de volume e as opções para bloquear a tela, encerrar a sessão ou desligar o computador.54

## **Seção 4.2: O Primeiro e Mais Importante Comando (Para Ambos os Métodos)**

Independentemente de como você instalou o Kali, este é o primeiro comando que você deve executar. O mundo da segurança digital muda rapidamente, e manter seu sistema e suas ferramentas atualizados é absolutamente crucial.

Abra o terminal e digite o seguinte comando:

sudo apt update && sudo apt upgrade

Vamos quebrar isso em partes para que você entenda exatamente o que está fazendo.

* sudo apt update: Pense nos "repositórios" do Kali como um grande catálogo de restaurante online. Este comando **não baixa nem instala nada**. Ele simplesmente liga para o restaurante e pega a versão mais recente do cardápio (a lista de pacotes), para que seu sistema saiba quais são as "especialidades do dia" (as novas versões de software disponíveis).55  
* sudo apt upgrade: Agora que você tem o cardápio atualizado, este comando olha para o que você já "pediu" (os pacotes instalados no seu sistema) e, se houver uma versão mais nova no cardápio, ele faz o pedido, ou seja, baixa e instala as atualizações.55  
* sudo e &&: sudo é o comando que diz ao sistema "execute o que vem a seguir com privilégios de superusuário", por isso ele pedirá sua senha. O && é um operador que simplesmente encadeia os comandos, dizendo "execute o segundo comando somente se o primeiro for bem-sucedido".

Execute este comando regularmente (pelo menos uma vez por semana) para manter seu sistema seguro e atualizado.

### **Seção 4.3: Recursos Especiais para Usuários do WSL**

Se você está usando o Kali no WSL, tem alguns truques extras na manga que tornam a experiência ainda mais integrada.

#### **Navegando Entre Dois Mundos**

Uma das maiores vantagens do WSL é a capacidade de acessar seus arquivos do Windows diretamente do terminal do Kali. O WSL faz isso através de "pontos de montagem".

Pense da seguinte forma: seu disco C: do Windows é como um prédio físico. Dentro do seu mundo Kali no WSL, foi criada uma porta mágica em um local chamado /mnt/c que leva diretamente para dentro desse prédio.16 O mesmo vale para outras unidades, como

D:, que aparecerá como /mnt/d.

Para acessar sua pasta de Downloads do Windows a partir do Kali, por exemplo, você usaria o comando:  
cd /mnt/c/Users/\<SeuNomeDeUsuarioDoWindows\>/Downloads

**Dica Pro:** Para facilitar ainda mais, você pode criar um "atalho" (chamado de link simbólico no Linux) na sua pasta pessoal do Kali que aponta diretamente para sua pasta de Downloads do Windows. Use este comando, substituindo pelo seu nome de usuário do Windows:  
ln \-s /mnt/c/Users/\<SeuNomeDeUsuarioDoWindows\>/Downloads \~/DownloadsWindows  
Agora, você pode simplesmente digitar cd \~/DownloadsWindows para ir direto para lá.62

#### **Trazendo a Interface Gráfica para o Jogo (Win-KeX)**

Por padrão, o WSL oferece uma experiência de linha de comando. Mas muitas ferramentas do Kali, como o Burp Suite ou o Wireshark, têm interfaces gráficas (GUIs) que facilitam muito o uso. Felizmente, o Kali vem com uma ferramenta fantástica chamada **Win-KeX** que permite executar uma área de trabalho gráfica completa do Kali dentro do Windows.63

1. Instalação: Primeiro, certifique-se de que sua lista de pacotes está atualizada e, em seguida, instale o Win-KeX.  
   sudo apt update && sudo apt install \-y kali-win-kex  
2. Execução: Para iniciar a área de trabalho gráfica, basta digitar um comando simples no terminal do Kali:  
   kex \--win \-s  
   * O \--win inicia o Kali em uma janela dedicada.  
   * O \-s adiciona suporte a som.

Após alguns instantes, uma janela com a área de trabalho completa do Kali XFCE aparecerá, permitindo que você use as ferramentas gráficas como se estivesse em uma instalação pura.
