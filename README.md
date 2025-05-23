# Cardápio Digital - Big Pastel da Bel

Este projeto é um cardápio digital moderno e interativo, desenvolvido para o restaurante "Big Pastel da Bel". Ele permite que os clientes visualizem os produtos, personalizem seus pedidos (como escolher bordas para pastéis) e preparem uma mensagem de pedido para ser enviada via WhatsApp.

## Funcionalidades Principais

*   **Visualização de Cardápio:** Navegação intuitiva por categorias de produtos (Pastéis Salgados, Especial, Pastéis Doces, Bebidas).
*   **Detalhes do Produto:** Cada item do cardápio exibe nome, descrição, preço e imagem (quando disponível).
*   **Seleção de Bordas:** Para pastéis, o cliente pode escolher uma borda recheada (Cheddar, Catupiry, Chocolate) ou optar por "Sem Borda Adicional". Todas as bordas são oferecidas sem custo adicional.
*   **Carrinho de Compras Dinâmico:**
    *   Adição de itens (pastéis com borda selecionada, bebidas).
    *   Notificação visual ao adicionar itens.
    *   Ajuste de quantidade (aumentar, diminuir) diretamente no resumo do pedido.
    *   Remoção de itens do pedido.
*   **Resumo e Envio do Pedido via WhatsApp:**
    *   Um modal permite revisar todos os itens selecionados e o valor total.
    *   Campos para o cliente informar nome e endereço completo para entrega.
    *   Seleção da forma de pagamento preferida (Cartão de Crédito, Débito, PIX, Dinheiro).
    *   Ao clicar em "Enviar Pedido via WhatsApp", uma nova aba é aberta com uma mensagem pré-formatada contendo todos os detalhes do pedido (cliente, endereço, itens, total, forma de pagamento), pronta para ser enviada para o número do restaurante.
*   **Design Responsivo:** Interface adaptada para uma ótima experiência em desktops, tablets e smartphones.
*   **Informações do Restaurante:**
    *   Seção de boas-vindas.
    *   Painel de informações com endereço, link para WhatsApp, formas de pagamento aceitas e informações sobre delivery.
    *   Rodapé com links para redes sociais (Instagram, Facebook) e contato.
*   **Botão Flutuante (FAB):** Acesso rápido para revisar e enviar o pedido, exibindo a contagem de itens selecionados.

## Estrutura do Projeto

O projeto é construído com React, TypeScript e Tailwind CSS, utilizando esbuild para o processo de build e desenvolvimento.

*   `index.html`: Ponto de entrada da aplicação. Contém a configuração global do Tailwind CSS, importação de fontes e o elemento raiz para o React.
*   `index.tsx`: Inicializa a aplicação React, montando o componente principal `App` no DOM.
*   `App.tsx`: Componente raiz que gerencia o estado geral da aplicação, como itens do cardápio, categoria ativa, itens selecionados no carrinho, e a abertura de modais.
*   `components/`: Diretório contendo todos os componentes reutilizáveis da UI:
    *   `Header.tsx`: Cabeçalho com o logo do restaurante.
    *   `Footer.tsx`: Rodapé com informações de contato e redes sociais.
    *   `CategoryNavigation.tsx`: Barra de navegação para filtrar itens por categoria.
    *   `StyledCategorySection.tsx`: Seção que exibe os itens de uma categoria específica.
    *   `MenuItemCard.tsx`: Card individual para cada item do menu.
    *   `SelectBordaModal.tsx`: Modal para o cliente escolher a borda do pastel.
    *   `OrderViaWhatsAppModal.tsx`: Modal para revisar o pedido, inserir dados do cliente e gerar a mensagem para o WhatsApp.
    *   `FloatingActionButtons.tsx`: Botão flutuante para acesso rápido ao modal de pedido.
    *   `WelcomeSection.tsx`: Mensagem de boas-vindas.
    *   `InfoPanel.tsx`: Painel com informações adicionais do restaurante.
*   `constants.tsx`: Arquivo central para dados estáticos da aplicação:
    *   `RESTAURANT_INFO`: Detalhes do restaurante (nome, logo, contato, endereço).
    *   `NAV_CATEGORIES`: Categorias de navegação do menu.
    *   `AVAILABLE_BORDAS`: Opções de bordas recheadas disponíveis.
    *   `ALL_MENU_ITEMS`: Lista completa de todos os produtos oferecidos.
    *   `AVAILABLE_PAYMENT_METHODS`: Formas de pagamento aceitas.
    *   Ícones utilizados na aplicação.
*   `types.ts`: Definições de tipos TypeScript para garantir a consistência dos dados em toda a aplicação (ex: `MenuItem`, `CartItem`, `Category`).
*   `scripts/prepare-html.js`: Script Node.js utilizado durante o processo de build para modificar o `index.html` para produção (remove o importmap e ajusta o caminho do bundle JS).
*   `package.json`: Define as dependências do projeto e os scripts NPM para desenvolvimento (`dev`) e build (`build`).
*   `vercel.json`: Configuração para deploy na plataforma Vercel.

## Tecnologias Utilizadas

*   **React (v19):** Biblioteca JavaScript para construção de interfaces de usuário.
*   **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
*   **Tailwind CSS:** Framework CSS utility-first para estilização rápida e customizável.
*   **Font Awesome:** Para ícones.
*   **esbuild:** Bundler e minifier JavaScript extremamente rápido, usado para o servidor de desenvolvimento e para gerar o bundle de produção.
*   **Node.js & npm:** Ambiente de execução JavaScript e gerenciador de pacotes.

## Como Executar o Projeto

### Pré-requisitos

*   Node.js (versão 16 ou superior recomendada)
*   npm (geralmente vem com o Node.js)

### Instalação

1.  Clone o repositório:
    ```bash
    git clone <url-do-repositorio>
    cd <nome-do-diretorio-do-projeto>
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```

### Desenvolvimento

Para iniciar o servidor de desenvolvimento (geralmente na porta 3000):

```bash
npm run dev

Isso iniciará o esbuild em modo de observação, com recarregamento automático (hot-reloading) e servirá a aplicação localmente.

Build para Produção

Para gerar os arquivos otimizados para deploy:

npm run build

Os arquivos de build serão gerados na pasta build/. O script prepare-html.js é executado como parte deste processo para preparar o index.html para produção.

Configuração

A maior parte da configuração do cardápio (informações do restaurante, itens do menu, categorias, bordas, etc.) pode ser encontrada e modificada no arquivo src/constants.tsx. As imagens dos produtos são referenciadas por URLs (atualmente hospedadas no Imgur).
Estilização
A estilização é primariamente feita com Tailwind CSS.
A configuração base do Tailwind (cores, fontes, espaçamentos customizados) está definida diretamente no index.html dentro da tag <script> tailwind.config = { ... } </script>.
Estilos globais e para a barra de rolagem estão na tag <style> no index.html.
Os componentes React utilizam as classes do Tailwind diretamente em seus elementos JSX.
Este cardápio digital visa oferecer uma experiência de usuário fluida e agradável, facilitando o processo de escolha e pedido para os clientes do Big Pastel da Bel.
