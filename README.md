# 🕐 Pontomais Auto Bater Ponto (Agendado)

Script Tampermonkey que bate o ponto automaticamente no [Pontomais](https://app2.pontomais.com.br/registrar-ponto) nos horários agendados, com suporte a acionamento manual e geolocalização configurável.

---

## ✅ Requisitos

- Navegador **Google Chrome** (obrigatório)
- Extensão **Tampermonkey** instalada
- Conta ativa no **Pontomais**

---

## 📦 Instalação

### 1. Instalar o Google Chrome

Caso ainda não tenha o Chrome instalado, baixe em:
👉 [https://www.google.com/chrome/](https://www.google.com/chrome/)

---

### 2. Instalar a extensão Tampermonkey

1. Abra o Chrome e acesse a Chrome Web Store:
   👉 [https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
2. Clique em **"Usar no Chrome"** e confirme clicando em **"Adicionar extensão"**.
3. O ícone do Tampermonkey (🧩) aparecerá na barra de ferramentas do Chrome.

---

### 3. Habilitar o Modo de Desenvolvedor no Chrome

Para que o Tampermonkey funcione corretamente com scripts externos, é necessário ativar o **Modo de Desenvolvedor** nas extensões:

1. Abra o Chrome e acesse: `chrome://extensions/`
2. No canto superior direito da página, ative a chave **"Modo do desenvolvedor"** (Developer mode).
3. Pronto! O modo de desenvolvedor está ativado.

---

### 4. Permitir Scripts de Usuário no Tampermonkey

1. Clique no ícone do **Tampermonkey** na barra de ferramentas do Chrome.
2. Selecione **"Painel"** (Dashboard) ou **"Gerenciar scripts"**.
3. Vá em **Configurações** (aba Settings / Configurações).
4. Em **"Modo de segurança"** ou **"Security"**, certifique-se de que a opção de execução de scripts está habilitada.
5. Salve as alterações se necessário.

> ⚠️ **Importante:** O Chrome pode exibir um aviso pedindo para confirmar o uso de extensões no modo de desenvolvedor. Clique em **"Manter"** para continuar.

---

### 5. Instalar o Script

1. Acesse a página do script no Greasy Fork:
   👉 [https://greasyfork.org/en/scripts/566798-pontomais-auto-bater-ponto-agendado](https://greasyfork.org/en/scripts/566798-pontomais-auto-bater-ponto-agendado)
2. Clique no botão **"Instalar este script"** (Install this script).
3. O Tampermonkey abrirá uma nova aba mostrando o código do script.
4. Clique em **"Instalar"** para confirmar a instalação.
5. O script aparecerá listado no painel do Tampermonkey com o status **Ativado**.

---

## ⚙️ Configuração Pós-Instalação

### 6. Ajustar a Geolocalização

O script simula uma localização GPS para que o Pontomais aceite o registro de ponto. **Você precisa ajustar as coordenadas para a localização correta** (escritório ou local de trabalho).

**Para descobrir as coordenadas do seu local:**

1. Acesse: 👉 [https://mylocation.org/](https://mylocation.org/)
2. Anote a **Latitude** e **Longitude** exibidas.

**Para editar as coordenadas no script:**

1. Abra o **Painel do Tampermonkey** → clique no script **"Pontomais auto bater ponto"** → **Editar**.
2. Localize o trecho abaixo no código:

```javascript
coords: {
    latitude: -28.6780227,
    longitude: -49.3735495,
    accuracy: 10,
```

3. Substitua os valores de `latitude` e `longitude` pelas coordenadas obtidas no passo anterior.
4. Clique em **Salvar** (ou `Ctrl+S`).

---

### 7. Acessar e Manter o Site do Pontomais Aberto

Para que o script funcione automaticamente, **o site do Pontomais deve estar aberto e você precisa estar logado**:

1. Acesse: 👉 [https://app2.pontomais.com.br/registrar-ponto](https://app2.pontomais.com.br/registrar-ponto)
2. Faça login com suas credenciais.
3. **Mantenha esta aba aberta** durante todo o dia de trabalho — o script monitora a página a cada 10 segundos e bate o ponto automaticamente nos horários configurados.

> ⚠️ **Não feche esta aba!** O script só funciona enquanto a página do Pontomais estiver aberta no Chrome.

---

## 🕹️ Como Usar

### Batida Automática (Agendada)

O script bate o ponto automaticamente nos seguintes horários base (com variação aleatória de 1–13 minutos para parecer mais natural):

| Evento        | Horário Base |
|---------------|--------------|
| Entrada       | 09:10        |
| Saída almoço  | 12:03        |
| Retorno almoço| 13:01        |
| Saída         | Calculado automaticamente para completar 8h líquidas de trabalho |

> O horário de saída é calculado automaticamente com base no horário de entrada e na duração do almoço, garantindo sempre **8 horas líquidas** de trabalho.

---

### Batida Manual

Você pode acionar o ponto manualmente de duas formas:

**Opção 1 — Botão flutuante na página:**
- Ao acessar o site do Pontomais, um botão azul **"👊 Punch now"** aparecerá no canto superior direito da página.
- Clique nele para bater o ponto imediatamente.

**Opção 2 — Menu do Tampermonkey:**
- Clique no ícone do **Tampermonkey** na barra de ferramentas do Chrome.
- Selecione **"👊 Punch now"** no menu.

---

## 🔔 Notificações

O script exibe notificações do sistema (ou toasts na página) informando:
- Quando o fluxo de batida de ponto foi iniciado.
- Quando o ponto foi confirmado com sucesso.
- Em caso de erro (botão não encontrado, etc.).

---

## 🐛 Suporte e Problemas

- Repositório no GitHub: 👉 [https://github.com/eazevedoflaviashpc/tampermonkey-pontomais](https://github.com/eazevedoflaviashpc/tampermonkey-pontomais)
- Abra uma issue em: 👉 [https://github.com/eazevedoflaviashpc/tampermonkey-pontomais/issues](https://github.com/eazevedoflaviashpc/tampermonkey-pontomais/issues)

---

## 📄 Licença

MIT License — uso livre para fins pessoais.
