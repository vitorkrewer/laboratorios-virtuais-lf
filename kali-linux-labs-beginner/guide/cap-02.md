# **Capítulo 2: A Jornada Pura (Instalação Completa do Sistema)**

Se você decidiu seguir o caminho do purista e dedicar uma máquina inteiramente ao Kali Linux, parabéns pela coragem\! Esta seção irá guiá-lo passo a passo. Lembre-se, este processo é irreversível e apagará todos os dados do computador.

## **Seção 2: A Preparação é Tudo**

Antes de começarmos, vamos garantir que temos tudo o que precisamos.

* **Requisitos do Sistema:** Seu computador precisa atender a algumas especificações mínimas.  
  * **Mínimo:** 2 GB de RAM e 20 GB de espaço em disco.8  
  * **Recomendado:** Pelo menos 2 GB de RAM (4 GB ou mais para uma experiência fluida) e 50 GB de espaço em um disco SSD. O SSD fará uma diferença enorme na velocidade do sistema.8  
* **A Regra de Ouro: FAÇA BACKUP DOS SEUS DADOS\!** Vou repetir para que fique bem claro: **este processo irá apagar tudo no disco rígido do seu computador.** Antes de prosseguir, copie todos os seus documentos, fotos, músicas e qualquer outro arquivo importante para um HD externo ou um serviço de armazenamento em nuvem. Não pule esta etapa\!

## **Seção 2: Adquirindo o Mapa (O Arquivo ISO)**

O "mapa" para nossa instalação é um arquivo de imagem de disco, conhecido como arquivo ISO.

1. Vá para a **única** página de download oficial do Kali Linux: [https://www.kali.org/get-kali/](https://www.kali.org/get-kali/).
2. **Aviso Importante:** Nunca, em hipótese alguma, baixe o Kali Linux de outra fonte. Existem versões modificadas e maliciosas circulando na internet que podem comprometer sua segurança desde o início.
3. Na página de downloads, você verá várias opções. Para este guia, procure pela seção "Installer Images" e baixe a imagem marcada como **"Installer"**. Esta versão contém todos os pacotes necessários para uma instalação completa sem precisar de conexão com a internet e é a mais recomendada.

## **Seção 2: Verificando a Autenticidade do Mapa (Checksum SHA256)**

Esta é a sua primeira lição prática de segurança. Precisamos garantir que o arquivo que baixamos é exatamente o mesmo que os desenvolvedores do Kali disponibilizaram, sem nenhuma alteração ou corrupção. Faremos isso verificando sua "impressão digital" digital, chamada de checksum SHA256.

1. Na página de download do Kali, ao lado do link de download, você encontrará uma longa sequência de letras e números. Este é o checksum SHA256 oficial. Copie este valor.17  
2. No seu Windows, abra o **PowerShell**. Você pode fazer isso clicando com o botão direito no menu Iniciar e selecionando "Terminal (Admin)" ou "Windows PowerShell (Admin)".  
3. Digite o seguinte comando, substituindo o caminho do arquivo pelo local onde você salvou o ISO do Kali:  
   Get-FileHash \-Path C:\\Users\\SeuUsuario\\Downloads\\kali-linux-202X.X-installer-amd64.iso \-Algorithm SHA256  
   * **Dica:** Você pode digitar Get-FileHash \-Path e, em seguida, arrastar e soltar o arquivo ISO diretamente na janela do PowerShell. Ele preencherá o caminho para você\! 26  
4. O PowerShell irá calcular o checksum do seu arquivo e exibi-lo. Agora, compare o valor gerado com o valor que você copiou do site do Kali. **Eles devem ser idênticos.** Se houver qualquer diferença, seu download está corrompido ou foi adulterado, e você deve baixá-lo novamente.

## **Seção 2.4: Forjando a Chave Mestra (Pendrive de Boot)**

Agora vamos transformar um pendrive comum em uma "chave mestra" que pode iniciar o instalador do Kali. Para isso, usaremos um programa gratuito e confiável.

* **Ferramentas:** Recomendamos o **Rufus** (https://rufus.ie/) ou o **balenaEtcher** (https://etcher.balena.io/). Ambos são excelentes, mas vamos usar o Rufus como exemplo por suas opções avançadas.27  
* **Passo a passo com o Rufus:**  
  1. Conecte um pendrive de pelo menos 8 GB no seu computador. Lembre-se que ele será completamente apagado.29  
  2. Abra o Rufus. No campo "Dispositivo", certifique-se de que seu pendrive está selecionado.  
  3. Em "Seleção de boot", clique em SELECIONAR e escolha o arquivo ISO do Kali Linux que você baixou.  
  4. Agora, uma parte importante: "Esquema de partição". Você verá as opções **GPT** e **MBR**.  
     * **GPT** é para computadores mais modernos com um sistema chamado UEFI.  
     * **MBR** é para computadores mais antigos com a BIOS tradicional.  
     * Se você não tem certeza, comece com **MBR**, pois ele tende a ser compatível com mais sistemas.31 Se não funcionar, você pode refazer o processo com GPT.  
  5. Clique em INICIAR. O Rufus pode exibir um aviso sobre a imagem ser do tipo "ISOHybrid". Ele perguntará em qual modo gravar. Escolha a opção **"Gravar no modo Imagem DD"**. Esta é a recomendação oficial da documentação do Kali para garantir a máxima compatibilidade de hardware.29  
  6. Confirme todos os avisos de que o pendrive será apagado e aguarde o processo terminar.

## **Seção 2.5: Destrancando os Portões (BIOS/UEFI)**

Antes que o computador possa usar nossa "chave mestra", precisamos dizer a ele para fazer isso. Faremos isso na BIOS (ou UEFI), que é o software fundamental que controla o hardware do seu computador antes mesmo do sistema operacional carregar.33

* **Como Acessar:** Reinicie o computador e, assim que ele começar a ligar, pressione repetidamente uma tecla específica. Essa tecla varia de acordo com o fabricante:  
  * **HP:** Esc ou F10 33  
  * **Dell:** F2 ou F12 33  
  * **Lenovo:** F1, F2, F12 ou Fn \+ F2 34  
  * **ASUS:** F2, Esc ou Del 34  
  * **Acer:** F2 ou Del 34  
* **Duas Configurações Críticas:** Uma vez dentro da BIOS/UEFI (a aparência pode variar muito), você precisa encontrar e alterar duas coisas:  
  1. **Desabilitar o Secure Boot (Inicialização Segura):** Esta é uma função de segurança que impede a inicialização de sistemas operacionais não autorizados. Como o Kali não é "assinado" pela Microsoft, o Secure Boot precisa ser desativado para que ele possa iniciar.31 Geralmente, essa opção fica em uma aba chamada "Security" ou "Boot".  
  2. **Alterar a Ordem de Boot:** Procure por um menu chamado "Boot Order", "Boot Priority" ou algo similar. Você precisa mover o seu pendrive (que pode aparecer como "USB Drive", "Removable Device" ou o nome da marca) para o topo da lista. Isso fará com que o computador tente iniciar a partir do pendrive antes de tentar iniciar a partir do disco rígido.33  
* Salve as alterações e saia da BIOS/UEFI. O computador irá reiniciar.

## **Seção 2.6: O Ritual de Instalação, Passo a Passo**

Se tudo correu bem, o computador irá reiniciar e, em vez de carregar o Windows, mostrará o menu de inicialização do Kali Linux. A partir daqui, use as setas do teclado e a tecla Enter para navegar.

1. **Tela de Boot:** Selecione a opção **"Graphical install"** e pressione Enter.38  
2. **Idioma e Localização:** Escolha seu idioma, país e layout de teclado preferidos.  
3. **Configuração de Rede:** O instalador tentará detectar sua placa de rede.  
   * Se você estiver conectado via cabo de rede (Ethernet), ele deve configurar a rede automaticamente. Ele pedirá um "hostname" (nome do computador na rede), você pode usar "kali".  
   * Se ele não detectar sua placa de rede (um problema comum, especialmente com Wi-Fi), não se preocupe. Selecione a opção "Não configurar a rede agora" e continue. Poderemos resolver isso depois da instalação.  
4. **Conta de Usuário:** Agora, você criará sua conta de usuário. **Não** é a conta "root".  
   * Insira seu nome completo.  
   * Escolha um nome de usuário (por exemplo, "aluno").  
   * Crie uma senha forte e confirme-a. Lembre-se desta senha\! Você a usará para fazer login e para executar comandos administrativos com sudo.39

## **Seção 2.7: Particionamento Simplificado**

Esta é a etapa mais temida pelos iniciantes, mas vamos torná-la muito simples. Como nosso objetivo é instalar o Kali como o único sistema, usaremos a opção automática que cuida de tudo para nós. Erros aqui podem ser catastróficos, por isso a simplicidade é nossa maior aliada. Não vamos nem discutir o particionamento manual para evitar confusão e riscos desnecessários.

1. Na tela "Particionar discos", selecione a opção **"Guiado \- usar o disco inteiro"**.38  
2. Na tela seguinte, selecione o disco rígido no qual você deseja instalar o Kali. Na maioria dos casos, haverá apenas uma opção.  
3. Em seguida, o instalador perguntará sobre o esquema de particionamento. Escolha **"Todos os arquivos em uma partição (recomendado para iniciantes)"**.38  
4. A última tela desta etapa mostrará um resumo de todas as alterações que serão feitas no disco. Esta é sua última chance de voltar atrás. Leia com atenção, confirme que está tudo certo e selecione **"Finalizar o particionamento e escrever as mudanças no disco"**. Confirme com "Sim" na tela seguinte.  
5. **Instalação do GRUB:** O instalador irá copiar os arquivos e, perto do final, perguntará se você deseja instalar o carregador de inicialização GRUB. O GRUB é o programa que permite que o computador carregue o Kali Linux. **Você deve instalá-lo.** Selecione "Sim" e, na próxima tela, escolha o seu disco rígido (geralmente algo como /dev/sda).38  
6. **Finalização:** Após a instalação do GRUB, o processo estará concluído\! O instalador pedirá que você remova o pendrive e reinicie o computador.

Ao reiniciar, você será recebido pela tela de login do Kali Linux. Parabéns, você conseguiu\!
