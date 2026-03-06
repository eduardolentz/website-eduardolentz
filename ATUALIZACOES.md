# Atualizacoes

Este documento registra a evolucao do portfolio em ordem cronologica reversa.

## [06-03-2026] - Idioma, UX e estabilidade visual

- Seletor de idioma no formato "bolinha" com seta e dropdown discreto.
- Opcoes de idioma adicionadas: PT, EN e ES.
- Seletor movido para fora do card (camada global), ficando visivel em Perfil, Tecnologias, Projetos e Badges.
- Internacionalizacao aplicada em textos estaticos e dinamicos (titulos, botoes, filtros, estado vazio e paginacao).
- Correcao de encoding em textos que estavam com caracteres quebrados.
- Badges no mobile ajustados para grid com 3 itens por linha e rolagem vertical.
- Efeito dos badges ajustado para animar apenas uma vez ao abrir a tela.
- Refino visual dos botoes de tecnologia com estilo mais minimalista em tons de verde.

## [06-03-2026] - Seguranca, filtros e responsividade

- Seguranca: adicao de `rel="noopener noreferrer"` em links externos com `target="_blank"`.
- Seguranca/manutencao: renderizacao dos cards de projeto sem `innerHTML` (uso de `createElement` e `textContent`).
- Filtros: ignoradas tags vazias no filtro de tecnologias.
- Paginacao: ajuste de comportamento ao redimensionar a tela (mobile/desktop).
- Responsividade: atualizacao de largura das telas de Projetos e Badges para `min(95vw, ...)`.
- Estrutura HTML: ajuste de idioma para `pt-BR` e reforco de metadado de charset.

## [25-03-2025] - Icones e animacao dos badges

- Alteracao dos icones dos botoes para icones do Icons8.
- Criacao do efeito de onda nos badges.

## [16-03-2025] - Botao Credly

- Adicao de botao na tela de badges para acesso ao perfil no Credly.

## [22-02-2025] - Atualizacoes no deploy

- Refatoracao da Tela 2 (Tecnologias): layout com duas colunas para inclusao de novas tecnologias.
- Integracao com GitHub Actions: configuracao de automacao para o processo de deploy do site.

## [20-02-2025] - Responsividade e organizacao

- Otimizacao do layout da tela de projetos para melhor adaptacao em dispositivos moveis e desktops.
- Ajuste no grid e na paginacao para exibicao adequada dos mini cards em diferentes resolucoes.
- Modularizacao dos dados dos projetos com a criacao do arquivo `projectsData.js`.
- Adicao de projetos em Python e Cloud.

## [19-02-2025] - Tela de badges

- Adicao de uma nova tela para badges de certificacoes.

## [18-02-2025] - Refatoracao e melhorias

- Refatoracao do codigo: separacao em tres arquivos (`index.html`, `style.css` e `script.js`).
- Mudancas de estilo: botoes com visual `outline` e ajustes de dimensoes para melhor equilibrio visual.
- Adicao da terceira tela: nova tela de projetos integrada ao layout.

## [13-02-2025] - Layout e efeitos

- Aumento do tamanho da foto de perfil.
- Ajuste de tipografia para uma combinacao mais marcante.
- Adicao de efeito `hover` nos icones de redes sociais.
- Ajuste do posicionamento dos botoes dentro do cartao.
- Adicao do documento JSON com a permissao para o bucket S3.

## [12-02-2025] - Primeira versao lancada

- Site criado e hospedado na AWS S3.
- Cartao de visita digital com links para redes sociais.
- Pagina de projetos interativa com efeito de virar cartao.