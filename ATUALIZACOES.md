# Atualizações

Este documento registra a evolução do portfólio em ordem cronológica reversa.

## [06-03-2026] - Segurança, filtros e responsividade

- Segurança: adição de `rel="noopener noreferrer"` em links externos com `target="_blank"`.
- Segurança/manutenção: renderização dos cards de projeto sem `innerHTML` (uso de `createElement` e `textContent`).
- Filtros: ignoradas tags vazias no filtro de tecnologias.
- Paginação: ajuste de comportamento ao redimensionar a tela (mobile/desktop).
- Responsividade: atualização de largura das telas de Projetos e Badges para `min(95vw, ...)`.
- Estrutura HTML: ajuste de idioma para `pt-BR` e reforço de metadado de charset.

## [25-03-2025] - Ícones e animação dos badges

- Alteração dos ícones dos botões para ícones do Icons8.
- Criação do efeito de onda nos badges.

## [16-03-2025] - Botão Credly

- Adição de botão na tela de badges para acesso ao perfil no Credly.

## [22-02-2025] - Atualizações no deploy

- Refatoração da Tela 2 (Tecnologias): layout com duas colunas para inclusão de novas tecnologias.
- Integração com GitHub Actions: configuração de automação para o processo de deploy do site.

## [20-02-2025] - Responsividade e organização

- Otimização do layout da tela de projetos para melhor adaptação em dispositivos móveis e desktops.
- Ajuste no grid e na paginação para exibição adequada dos mini cards em diferentes resoluções.
- Modularização dos dados dos projetos com a criação do arquivo `projectsData.js`.
- Adição de projetos em Python e Cloud.

## [19-02-2025] - Tela de badges

- Adição de uma nova tela para badges de certificações.

## [18-02-2025] - Refatoração e melhorias

- Refatoração do código: separação em três arquivos (`index.html`, `style.css` e `script.js`).
- Mudanças de estilo: botões com visual `outline` e ajustes de dimensões para melhor equilíbrio visual.
- Adição da terceira tela: nova tela de projetos integrada ao layout.

## [13-02-2025] - Layout e efeitos

- Aumento do tamanho da foto de perfil.
- Ajuste de tipografia para uma combinação mais marcante.
- Adição de efeito `hover` nos ícones de redes sociais.
- Ajuste do posicionamento dos botões dentro do cartão.
- Adição do documento JSON com a permissão para o bucket S3.

## [12-02-2025] - Primeira versão lançada

- Site criado e hospedado na AWS S3.
- Cartão de visita digital com links para redes sociais.
- Página de projetos interativa com efeito de virar cartão.
