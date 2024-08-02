# Hotelly

Caso de Estudo para visualização, comparação e escolha eficiente de hotéis utilizando Vue 3 + Vite + TailwindCSS + Sass.

## IDE Recomendada

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (e desabilitar Vetur).

## Suporte de Tipos para Importações `.vue` em TS

O TypeScript não consegue lidar com informações de tipo para importações `.vue` por padrão, então substituímos o CLI `tsc` por `vue-tsc` para verificação de tipos. Nos editores, precisamos do [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) para tornar o serviço de linguagem do TypeScript ciente dos tipos `.vue`.

## Personalizar Configuração

Veja [Referência de Configuração do Vite](https://vitejs.dev/config/).

## Configuração do Projeto

### Instalar o Projeto em Sua Máquina

```sh
npm install
```

### Compilar e Hot-Reload para Desenvolvimento

```sh
npm run dev
```

### Verificação de Tipos, Compilação e Minificação para Produção

```sh
npm run build
```

### Executar Testes Unitários com Vitest

```sh
npm run test:unit
```

### Lint com ESLint

```sh
npm run lint
```

## Escolhas de Design e Arquitetura

### Frameworks e Ferramentas

- **Vue.js:** Escolhido por sua simplicidade e desempenho eficiente para aplicações de página única (SPA).
- **TypeScript:** Adicionado para garantir a segurança de tipos e facilitar a manutenção do código.
- **Pinia:** Utilizado para gerenciamento de estado, oferecendo uma API simples e intuitiva.
- **Vite:** Ferramenta de build escolhida por sua velocidade e simplicidade, substituindo o Webpack.
- **ESLint:** Implementado para garantir a consistência do código e boas práticas.

### Estrutura do Projeto

O projeto segue uma estrutura modular para facilitar a escalabilidade e manutenção:

```plaintext
src/
├── assets/          # Arquivos estáticos (imagens, estilos, etc.)
├── components/      # Componentes Vue reutilizáveis
    ├── *(categoria-do-componente)/      # Separados por categoria
        ├── *(nome-do-componente)/       # Arquivos relacionados ao componente
├── css/             # Arquivos de estilo (CSS/SASS)
├── directives/      # Diretivas personalizadas Vue
├── layouts/         # Arquivos de layout para renderização de páginas
├── pages/           # Componentes de visualização (páginas)
├── plugins/         # Plugins globais
├── router/          # Configurações de roteamento Vue Router
├── services/        # Arquivos de serviço API
├── statics/         # Arquivos estáticos (JSON, Lang)
├── stores/          # Módulos Pinia para gerenciamento de estado
├── types/           # Arquivos de tipos (Interfaces)
├── utils/           # Funções utilitárias
└── main.ts          # Arquivo de entrada principal
```

### Rotas e Navegação

O Vue Router é utilizado para gerenciar a navegação entre diferentes vistas da aplicação. As rotas são definidas em `src/router/index.ts` e são configuradas para suportar carregamento assíncrono (lazy loading) para melhorar o desempenho.

### Gerenciamento de Estado

Pinia é usado para gerenciamento de estado centralizado. Os módulos de estado são definidos em `src/stores` e permitem o compartilhamento eficiente de estado entre diferentes componentes.

### Testes

Os testes unitários são escritos usando Vitest, um framework de testes focado em velocidade e simplicidade. Os testes estão localizados em `src/components/__tests__`.

### Linting

ESLint é configurado para aplicar regras de linting ao código, garantindo a conformidade com as melhores práticas de desenvolvimento. As regras podem ser personalizadas no arquivo `.eslintrc.js`.

## Melhorias futuras (Roadmap)

```plaintext
+ Adicionar autenticação;
+ Adicionar paginação na lista;
+ Adicionar tela de detalhes de experiência;
+ Adicionar menu no mobile.
```
