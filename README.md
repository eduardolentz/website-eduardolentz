# Portfolio Interativo - Eduardo O. Lentz

Landing page de portfolio com navegacao por card, filtros de projetos e tela de badges.

Site: https://eduardolentz.com.br

## Visao geral

O projeto foi construido para apresentar perfil profissional, tecnologias, projetos e certificacoes em uma experiencia unica para desktop e mobile.

## Funcionalidades

- Card de perfil com foto, localizacao e redes sociais.
- Efeito de flip entre Perfil e Tecnologias.
- Tela de Projetos com:
  - filtros por tags,
  - paginacao,
  - links para interface, repositorio, artigo e documentacao.
- Tela de Badges com grid responsivo e animacao leve de entrada.
- Seletor de idioma global (PT, EN, ES) com dropdown discreto.
- Layout responsivo para mobile e desktop.

## Estrutura do projeto

```text
website-eduardolentz/
|-- .github/
|   `-- workflows/
|       `-- deploy.yml
|-- imagens/
|-- index.html
|-- style.css
|-- script.js
|-- projectsData.js
|-- bucket-policy.json
|-- ATUALIZACOES.md
`-- README.md
```

## Tecnologias

- HTML5
- CSS3
- Tailwind CSS (CDN)
- JavaScript (vanilla)
- AWS S3 (hospedagem)
- GitHub Actions (deploy)

## Como executar localmente

1. Clone o repositorio:
   ```bash
   git clone https://github.com/eduardolentz/website-eduardolentz.git
   ```
2. Entre na pasta:
   ```bash
   cd website-eduardolentz
   ```
3. Abra `index.html` no navegador.

## Deploy

O deploy e feito para AWS S3, com automacao via GitHub Actions.

Politica do bucket: `bucket-policy.json`.

## Historico de mudancas

Consulte `ATUALIZACOES.md` para o historico completo.