# 🎨 SiteCSS.io - Gerador de Design Neumórfico (Clonagem Profissional)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)

## 📝 Sobre o Projeto

O **neumorphism.io** é um projeto de **Engenharia Reversa** de alta fidelidade da ferramenta original *neumorphism.io*. Desenvolvido como um desafio técnico de clonagem de UI e lógica de frontend, este projeto replica com precisão a experiência de geração de estilos CSS neumórficos (Soft UI).

O objetivo principal foi desconstruir e reconstruir a lógica de cálculo de sombras, manipulação de cores para gerar contrastes realistas e a interface minimalista que define o estilo Neumórfico.

---

## ✨ Funcionalidades

- **Preview em Tempo Real:** Visualização instantânea de como o seu componente ficará no navegador.
- **Controle Total de Sombras:** Ajuste de distância, intensidade, blur e tamanho através de sliders intuitivos.
- **Seleção de Formas:** Suporte para os 4 estados clássicos: *Flat*, *Concave*, *Convex* e *Pressed (Inset)*.
- **Seletor de Cores Inteligente:** Sistema de entrada hexadecimal com visualização imediata da paleta.
- **Exportação Rápida:**
  - **Copiar:** Botão de cópia direta do código CSS gerado.
  - **Baixar:** Opção de baixar o arquivo `.css` pronto para anexar ao seu projeto.
- **Design Responsivo:** Interface otimizada para Desktop e dispositivos móveis.

---

## 🚀 Tecnologias Utilizadas

*   **Core:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
*   **Estilização:** [Tailwind CSS 4](https://tailwindcss.com/)
*   **Animações:** [Motion](https://motion.dev/) (para transições suaves entre estados)
*   **Ícones:** [Lucide React](https://lucide.dev/)
*   **Build System:** [Vite](https://vitejs.dev/)

---

## 🛠️ Como Executar o Projeto

Para rodar este projeto localmente para fins de estudo ou modificação, siga os passos:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/seu-usuario/sitecss-io.git
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse no navegador:** `http://localhost:3000`

---

## 📂 Estrutura de Pastas

```text
src/
├── components/
│   └── layout/         # Header e Footer reutilizáveis
├── App.tsx             # Lógica principal do gerador e motor de sombras
├── index.css           # Design tokens e configurações Tailwind
└── main.tsx            # Ponto de entrada da aplicação
⚖️ Licença
Este projeto é um clone para fins educacionais e de portfólio. O design original e o conceito pertencem ao criador do neumorphism.io. O código desta implementação está sob a licença MIT.
Voltar ao topo
code
Code
O arquivo `README.md` foi criado na raiz do seu projeto e está pronto para ser enviado ao GitHub junto com o código!
