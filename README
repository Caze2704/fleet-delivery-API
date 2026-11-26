# 🚚 Fleet Delivery API

API RESTful desenvolvida em **Node.js**, **TypeScript**, **Express** e **Sequelize (PostgreSQL)** para gerenciamento de frota de veículos e controle completo do ciclo de vida de entregas logísticas.

Projeto desenvolvido como entrega prática da disciplina de **Lógica de Programação** do curso de **Bacharelado em Ciências e Tecnologia (UFRN)**, aplicando arquitetura em camadas, validação estrita em tempo de execução (*Fail-Fast*), tipagem avançada com DTOs e transações atômicas no banco de dados.

---

## 🛠️ Tecnologias Utilizadas

* **Runtime & Linguagem:** Node.js, TypeScript (`tsx` para execução em desenvolvimento)
* **Framework Web:** Express
* **ORM & Banco de Dados:** Sequelize, PostgreSQL
* **Segurança & Integridade:** Type Guards customizados (`isUUID`, `isCoordenate`), DTOs (`Omit`) e `sequelize.transaction`

---

## 📂 Arquitetura e Estrutura de Pastas

O projeto segue o padrão de separação de responsabilidades em camadas:

```text
fleet-delivery-API/
├── src/
│   ├── config/
│   │   └── db.ts                  # Configuração e conexão com o PostgreSQL via Sequelize
│   ├── controllers/
│   │   ├── DeliveryController.ts  # Camada HTTP (request/response) de entregas
│   │   └── VehicleController.ts   # Camada HTTP (request/response) de veículos
│   ├── helpers/
│   │   ├── isCoordenate.ts        # Type Guard para validação de coordenadas [lat, lng]
│   │   ├── isUUID.ts              # Type Guard para validação de identificadores UUID
│   │   └── throwError.ts          # Padronização de exceções com HTTP status code
│   ├── middlewares/               # Middlewares globais (ex: tratamento de erros)
│   ├── models/
│   │   ├── Delivery.ts            # Modelo Sequelize da tabela Deliveries
│   │   ├── Vehicle.ts             # Modelo Sequelize da tabela Vehicles
│   │   └── index.ts               # Associações e relacionamentos (Vehicle 1:N Delivery)
│   ├── routes/
│   │   ├── DeliveryRoutes.ts      # Definição dos endpoints de entregas
│   │   └── VehicleRoutes.ts       # Definição dos endpoints de veículos
│   ├── services/
│   │   ├── DeliveryService.ts     # Regras de negócio, máquina de estados e transações
│   │   └── VehicleService.ts      # Regras de negócio e disponibilidade da frota
│   ├── types/
│   │   ├── Coordenate.ts          # Tipagem de tupla geográfica [number, number]
│   │   ├── Delivery.ts            # Tipos de status e DTOs (CreateDeliveryDTO, StartDeliveryDTO)
│   │   ├── Vehicle.ts             # Tipos de status e DTOs de veículos
│   │   └── express.d.ts           # Extensões de tipagem do Express
│   ├── app.ts                     # Configuração de middlewares e registro das rotas
│   └── server.ts                  # Inicialização do servidor HTTP e sincronização do banco
├── .env.example                   # Modelo de variáveis de ambiente
├── package.json
└── tsconfig.json
```

---

## ⚙️ Como Executar Localmente

### 1. Pré-requisitos
* **Node.js** instalado
* **PostgreSQL** rodando localmente com um banco de dados criado para a aplicação

### 2. Instalação e Configuração
Clone o repositório e instale as dependências:

```bash
git clone https://github.com/Caze2704/fleet-delivery-API.git
cd fleet-delivery-API
npm install
```

Crie um arquivo `.env` na raiz do projeto baseado no `.env.example` e preencha com as credenciais do seu banco PostgreSQL:

```env
PORT=3000
DB_NAME=fleet_delivery
DB_USER=postgres
DB_PASS=sua_senha
DB_HOST=localhost
DB_PORT=5432
```

### 3. Executando a Aplicação
Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

*(Opcional)* Para verificar a integridade da tipagem TypeScript sem gerar build:

```bash
npx tsc --noEmit
```

---

## 📌 Endpoints da API

### 🚛 Veículos (`/vehicles`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/vehicles` | Cadastra um novo veículo na frota (`status` inicial: `disponivel`). |
| `GET` | `/vehicles` | Lista todos os veículos. Aceita filtro opcional via query (`?status=disponivel`). |
| `PATCH` | `/vehicles/:id` | Atualiza dados ou status operacional do veículo (`disponivel`, `em_rota`, `manutencao`). |

**Exemplo de Body (`POST /vehicles`):**
```json
{
  "license_plate": "ABC-1234",
  "model": "Scania R450",
  "capacityKG": 10000,
  "coordenate": [-5.7945, -35.211]
}
```

---

### 📦 Entregas (`/deliveries`)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| `POST` | `/deliveries` | Registra uma nova entrega (`status`: `aguardando_coleta`) e gera o `trackingCode` (`TRK-XXXXXXXX`). |
| `GET` | `/deliveries` | Lista todas as entregas ordenadas por criação. Aceita filtro via query (`?status=em_transito`). |
| `PATCH` | `/deliveries/:id/start` | Vincula um veículo disponível com capacidade compatível, altera a entrega para `em_transito` e o veículo para `em_rota` (operação atômica). |
| `PATCH` | `/deliveries/:id/complete` | Finaliza a entrega (`entregue`), libera o veículo (`disponivel`) e atualiza sua coordenada para o destino da entrega. |
| `PATCH` | `/deliveries/:id/cancel` | Cancela a entrega (`cancelada`). Se estiver `em_transito`, libera automaticamente o veículo vinculado para `disponivel`. |

**Exemplo de Body (`POST /deliveries`):**
```json
{
  "description": "Carga de equipamentos eletrônicos",
  "destination": [-5.8256, -35.2051],
  "weightKG": 450
}
```

**Exemplo de Body (`PATCH /deliveries/:id/start`):**
```json
{
  "vehicleId": "ff344839-8b04-4978-a343-396391f323fd"
}
```

---

## 🧠 Destaques Técnicos da Implementação

* **Integridade Transacional (`sequelize.transaction`):** Operações críticas que alteram simultaneamente as tabelas `Deliveries` e `Vehicles` (`start`, `complete` e `cancel`) ocorrem dentro de transações gerenciadas, garantindo *rollback* automático em caso de falha.
* **Validação Fail-Fast com Type Guards:** Parâmetros de rota (`UUID`) e payloads geográficos (`[latitude, longitude]`) são validados antes de qualquer consulta ao banco de dados, evitando conexões desnecessárias.
* **Máquina de Estados:** Bloqueio de transições inconsistentes, impedindo o despacho de veículos em manutenção/em rota, sobrecarga acima da capacidade (`capacityKG`) ou alteração de entregas já concluídas/canceladas.

---

## 👨‍💻 Autor

Desenvolvido por **Eduardo Henrique Duarte Galvão** ([GitHub](https://github.com/Caze2704) | [LinkedIn](https://www.linkedin.com/in/eduardo-duarte2704/)).