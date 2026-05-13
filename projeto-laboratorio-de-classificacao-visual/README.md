# 🧠 Classificador de Expressões: Teachable Machine Study

![Status](https://img.shields.io/badge/Status-Conclu%C3%ADdo-success)
![Machine Learning](https://img.shields.io/badge/IA-Machine%20Learning-blue)
![Ethical AI](https://img.shields.io/badge/Ethics-Human--in--the--loop-orange)

## 📋 Sobre o Projeto
Este projeto foi desenvolvido como uma atividade prática para explorar o funcionamento de redes neurais de classificação de imagens utilizando a ferramenta **Teachable Machine**. [cite_start]O objetivo principal foi treinar um modelo capaz de distinguir expressões faciais básicas (Feliz vs. Triste) e, posteriormente, realizar uma análise crítica sobre os impactos éticos e técnicos de vieses em algoritmos de IA[cite: 1, 3, 13].

## 🧪 Experimento Live
[cite_start]O modelo foi treinado e testado em tempo real via webcam, processando os frames para gerar uma saída probabilística baseada nos padrões aprendidos durante a fase de treinamento[cite: 1, 4, 7].

* [cite_start]**Link do Experimento:** [Acessar Teachable Machine](https://teachablemachine.withgoogle.com/models/zpidkhizq/) [cite: 1]
* [cite_start]**Classes Identificadas:** `Feliz` e `Triste` [cite: 8, 9]

## 🛠️ Tecnologias Utilizadas
* [cite_start]**Teachable Machine (Google):** Plataforma para treinamento de modelos de ML[cite: 3].
* [cite_start]**Visão Computacional:** Processamento de entrada via webcam para classificação em tempo real[cite: 11].
* [cite_start]**Markdown:** Para documentação técnica do memorial[cite: 13].

## 📑 Memorial de Impacto e Ética
Uma parte fundamental deste estudo foi a análise do **viés algorítmico**. Durante o desenvolvimento, foram observados os seguintes pontos críticos:

### ⚠️ O Problema do Viés
[cite_start]O viés ocorre quando o algoritmo é alimentado com um conjunto de dados limitado ou pouco diverso[cite: 14]. [cite_start]Se as imagens de treino não representam diferentes tipos de pessoas e expressões, o sistema aprende padrões incompletos, interpretando emoções de forma incorreta e distorcendo a realidade[cite: 15, 16].

### ⚖️ Consequências Sociais
[cite_start]Classificações errôneas — como identificar alguém como "triste" erroneamente — podem gerar[cite: 17]:
* [cite_start]**Frustração e constrangimento:** Impacto direto na experiência do usuário[cite: 18].
* [cite_start]**Prejuízos Profissionais/Acadêmicos:** Risco de injustiças ou invisibilização do indivíduo perante sistemas automatizados[cite: 18].

### 🛡️ Mitigação: Human-in-the-loop
[cite_start]Para reduzir esses riscos, propõe-se a utilização do modelo **Human-in-the-loop**[cite: 19]. [cite_start]Neste formato, a supervisão humana atua na revisão dos dados e das decisões do algoritmo, garantindo[cite: 20]:
1.  [cite_start]Maior diversidade nos dados de entrada[cite: 20].
2.  [cite_start]Decisões mais justas e alinhadas com o contexto humano[cite: 20].

[Voltar ao início](https://github.com/rickeelme/portfolio-rickeelme-lopes-de-souza)
---
*Este projeto faz parte do meu portfólio de estudos em Engenharia de Software e Inteligência Artificial.*


