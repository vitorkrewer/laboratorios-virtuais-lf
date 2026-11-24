# Erros comuns de prova

Estes são os deslizes que mais custam pontos. Leia a lista inteira **antes** da prova e, depois de resolver qualquer exercício, repasse mentalmente esta página.

## Álgebra

> [!ATENÇÃO] **Erro 1: $(a+b)^2 = a^2 + b^2$.** O correto é $a^2 + 2ab + b^2$. Vale também para $\sqrt{a^2 + b^2} \neq a + b$.

> [!ATENÇÃO] **Erro 2: cancelar termos em vez de fatores.** $\dfrac{x + 3}{x}\neq 1 + 3$ e $\dfrac{x^2 + 2x}{x}\neq x^2 + 2$. Só se cancela o que **multiplica** o numerador inteiro e o denominador inteiro: $\dfrac{x(x+2)}{x} = x + 2$.

> [!ATENÇÃO] **Erro 3: $\ln(a+b) = \ln a + \ln b$.** Nunca. O que vale é $\ln(ab) = \ln a + \ln b$.

**Erro 4: sinal ao distribuir.** $-(x - 3) = -x + 3$, não $-x - 3$. Em contas longas, use parênteses.

**Erro 5: dividir por zero escondido.** Ao cancelar um fator $(x - a)$, você assume $x \neq a$. Em limites isso não atrapalha; em equações, pode perder uma solução.

## Limites

**Erro 6: tratar $\dfrac00$ como $0$ ou como "não existe".** É indeterminação. Fatore, racionalize ou use L'Hôpital.

**Erro 7: ignorar os limites laterais** com módulo, partes ou $\dfrac1x$.

**Erro 8: dizer que $\dfrac{k}{0} = \infty$ sem checar o sinal.** Compare os dois lados: pode ser $+\infty$, $-\infty$ ou não existir.

**Erro 9: aplicar L'Hôpital sem a indeterminação.** Se o limite não é $\frac00$ nem $\frac\infty\infty$, L'Hôpital dá resposta errada. Verifique **antes** de derivar.

**Erro 10: usar graus no limite fundamental.** $\lim\frac{\sin x}{x}=1$ só vale com $x$ em **radianos**.

## Derivadas

> [!ATENÇÃO] **Erro 11: derivar produto como produto das derivadas.** $(uv)' = u'v + uv'$, e **não** $u'v'$. O mesmo vale para o quociente.

**Erro 12: esquecer a regra da cadeia.** A derivada de $\sin(3x)$ é $3\cos(3x)$, não $\cos(3x)$. Derivada de $e^{x^2}$ é $2x\,e^{x^2}$, não $e^{x^2}$. **Pergunta de checagem:** "tem algo diferente de $x$ dentro?" Se sim, multiplique pela derivada do interior.

**Erro 13: $(x^n)' = x^{n-1}$** (esquecer o $n$) ou aplicar a regra da potência a $a^x$ ($(2^x)' \neq x2^{x-1}$; o correto é $2^x\ln 2$).

**Erro 14: confundir $f'(x_0)$ com $f(x_0)$** em problemas de reta tangente. A inclinação é $f'(x_0)$; o ponto de passagem é $(x_0, f(x_0))$.

**Erro 15: em otimização, não testar extremidades e não responder à pergunta.** Ache o ponto, justifique que é máximo/mínimo e responda com unidade.

**Erro 16: em taxas relacionadas, substituir os valores antes de derivar.**

**Erro 17: afirmar que $f'(c)=0$ implica extremo.** Contraexemplo: $x^3$ em $0$.

## Integrais

> [!ATENÇÃO] **Erro 18: esquecer o $+C$** em integral indefinida.

**Erro 19: $\int\dfrac1x\,dx = \ln x$** esquecendo o módulo: o correto é $\ln\lvert x\rvert + C$.

**Erro 20: $\int x^{-1}dx = \dfrac{x^0}{0}$.** A fórmula da potência não vale para $n = -1$.

**Erro 21: integral do produto como produto das integrais.** $\int fg \neq \int f\int g$. Use substituição ou partes.

**Erro 22: trocar a variável mas não os limites** na integral definida (ou misturar $u$ com limites de $x$).

**Erro 23: esquecer o fator constante da substituição.** Em $\int\cos(5x)dx$, o resultado é $\frac15\sin 5x$, e não $\sin 5x$.

**Erro 24: confundir integral com área total.** A integral é área **com sinal**. Para a área, quebre o intervalo nos zeros de $f$ ou integre $\lvert f\rvert$.

**Erro 25: aplicar o TFC com função descontínua** no intervalo, como $\int_{-1}^1\frac{dx}{x^2}$.

## Teste rápido

Responda sem consultar o texto acima. Com 70% de acerto ou mais, o capítulo é marcado como concluído no seu progresso.

```quiz
? Um aluno escreveu $\dfrac{d}{dx}\sin\left(x^2\right)=\cos\left(x^2\right)$. Qual foi o erro?
+ Esqueceu a regra da cadeia: falta o fator $2x$
- O sinal: deveria ser $-\cos\left(x^2\right)$
- Deveria ser $\cos(2x)$
- Não há erro
> A resposta certa é $2x\cos\left(x^2\right)$.

? A igualdade $\sqrt{x^2+9}=x+3$ é:
+ falsa em geral: a raiz não se distribui na soma
- verdadeira para todo $x>0$
- verdadeira para todo $x$
- verdadeira apenas para $x<0$
> Teste $x=4$: $\sqrt{25}=5\neq7$. Ela só vale em $x=0$.

? Com $u=x^2$, a integral $\displaystyle\int_1^2 2x\,e^{x^2}dx$ vira:
+ $\displaystyle\int_1^4 e^u\,du$
- $\displaystyle\int_1^2 e^u\,du$
- $\displaystyle\int_1^4 2x\,e^u\,du$
- $\displaystyle\int_1^2 2e^u\,du$
> Os limites mudam junto: $x=1\Rightarrow u=1$ e $x=2\Rightarrow u=4$.

? Um aluno aplicou L'Hôpital em $\displaystyle\lim_{x\to0}\frac{x+1}{x+2}$ e obteve $1$. O valor correto é:
+ $\frac12$
- $1$
- $0$
- O limite não existe
> Não há indeterminação ($\frac12$ por substituição direta), então L'Hôpital não se aplica.
```

## Hábitos que evitam erro

1. **Confira derivando:** para toda primitiva, derive de volta.
2. **Teste valores simples** ($x=0$, $x=1$) no resultado final.
3. **Use parênteses** com abundância, principalmente com sinais negativos.
4. **Escreva cada passo.** Pular passos é a maior fonte de erro por distração.
5. **Releia o enunciado** no fim: o que foi pedido? Valor, intervalo, reta, área?
6. Se sobrar tempo, **refaça** o exercício mais longo por outro caminho.
