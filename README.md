# 🕐 Pontomais Automator — Guia de instalação e uso

> [!WARNING]
> ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
> ## ⚠️ AVISO IMPORTANTE — LEIA ANTES DE CONTINUAR
>
> Este script foi criado **exclusivamente para uso em ambientes de testes controlados** e para estudo das possibilidades do JavaScript.
>
> **Se a sua empresa não possui automação para lançamento de horas, isso significa que o uso deste script é PROIBIDO.**
>
> É **vetado** o uso deste script para burlar sistemas de controle de ponto. As consequências podem variar de acordo com a política de cada empresa — podendo incluir advertências, demissão por justa causa e até implicações legais.
>
> > 🧾 **Se estiver cogitando executá-lo em produção - caso ainda não tenha te convencido - faça o seguinte, coloque todos os seus boletos na mesa e medite: "Mas vale a pena?"**
>
> **O autor não se responsabiliza por qualquer uso indevido desta ferramenta.**

 *"I would prefer even to fail with honor than win by cheating."*
 — E.T. Bilú

---

Este guia explica como instalar e configurar o **Pontomais Automator** e o **Test Mode** usando a extensão Tampermonkey no Google Chrome.

---

## ✅ Pré-requisitos

- Utilize o navegador **Google Chrome** (obrigatório).

---

## 1. Instalar a Extensão Tampermonkey

1. Abra o Google Chrome.
2. Acesse a página da extensão na Chrome Web Store pelo link abaixo:
   👉 [https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
3. Clique em **"Usar no Chrome"** e depois em **"Adicionar extensão"**.
4. Aguarde a instalação. O ícone do Tampermonkey aparecerá na barra de extensões do Chrome.

---

## 2. Ativar o Modo de Desenvolvedor no Chrome

Para que scripts de usuário funcionem corretamente, é necessário habilitar o **Modo de Desenvolvedor** nas extensões do Chrome:

1. Abra o Chrome e acesse: `chrome://extensions/`
2. No canto superior direito da página, ative a opção **"Modo do desenvolvedor"** (toggle).
3. O modo de desenvolvedor estará ativo quando o toggle ficar azul/ligado.

---

## 3. Permitir Scripts de Usuário no Tampermonkey

1. Clique no ícone do **Tampermonkey** na barra de ferramentas do Chrome.
2. Selecione **"Painel"** ou **"Dashboard"**.
3. Vá até a aba **"Configurações"**.
4. Em **"Modo de acesso a arquivos"** (ou *Script access* / *Allow scripts*), certifique-se de que a opção está habilitada para permitir a execução de scripts.
5. Salve as alterações se necessário.

---

## 4. Instalar o Script Principal

1. Acesse o script pelo link abaixo:
   👉 [https://greasyfork.org/en/scripts/566798-pontomais-automator-florian%C3%B3polis-holidays](https://greasyfork.org/en/scripts/566798-pontomais-automator-florian%C3%B3polis-holidays)
2. Na página do script, clique no botão verde **"Instalar este script"**.
3. O Tampermonkey abrirá uma nova aba mostrando os detalhes do script.
4. Clique em **"Instalar"** para confirmar.
5. O script estará ativo e pronto para uso.

---

## 5. Instalar o Script de Teste (Test Mode) 🧪

O **Test Mode** é um script auxiliar que permite verificar se as notificações do Telegram estão funcionando corretamente e se a lógica de feriados/fins de semana está sendo aplicada — **sem registrar nenhum ponto de verdade**.

1. Acesse o script de teste pelo link abaixo:
   👉 [https://greasyfork.org/en/scripts/566978-pontomais-automator-test-mode](https://greasyfork.org/en/scripts/566978-pontomais-automator-test-mode)
2. Clique em **"Instalar este script"** e confirme no Tampermonkey.
3. Com o site do Pontomais aberto, pressione **`Cmd+Shift+K`** (Mac) ou **`Ctrl+Shift+K`** (Windows) para disparar o teste.

### O que o Test Mode faz:

| Situação | Mensagem no Telegram |
|----------|----------------------|
| Dia útil normal | ✅ Informa o horário simulado em que o ponto *seria* registrado |
| Fim de semana | 😴 Informa que nenhuma ação seria executada |
| Feriado | 🏖️ Informa que nenhuma ação seria executada |

> 🔒 **O Test Mode nunca clica em nada no site.** É 100% seguro de executar a qualquer momento.

---

## ⚠️ Aviso Importante: Configurar Geolocalização

Após a instalação, é necessário **configurar a geolocalização correta** para que o ponto seja registrado no local correto.

1. Acesse o site [https://mylocation.org/](https://mylocation.org/) para descobrir suas coordenadas atuais (latitude e longitude).
2. Anote os valores de **latitude** e **longitude** exibidos.
3. Abra as configurações do script no Tampermonkey e informe suas coordenadas nos campos correspondentes.

> 📍 **Dica:** Verifique se a localização exibida corresponde ao seu local de trabalho para evitar divergências no registro de ponto.

---

## ⚠️ Aviso Importante: Manter o Site Pontomais Aberto

Para que o script funcione corretamente e consiga registrar o ponto automaticamente no horário agendado:

1. Acesse o site do **Pontomais**: [https://app.pontomais.com.br](https://app.pontomais.com.br)
2. **Faça login** com suas credenciais.
3. **Mantenha a aba do Pontomais aberta** no navegador durante todo o período em que deseja que o ponto seja batido automaticamente.

> 🔔 **Importante:** O script só consegue executar se a aba do Pontomais estiver aberta e você estiver autenticado. Não feche a aba nem faça logout.

---

## O que há de novo — v1.4.1

- **Botão flutuante na tela** — um botão **"⏱ Bater Ponto Agora"** aparece no canto inferior direito da página, permitindo disparar o ponto manualmente a qualquer momento. Ele respeita as mesmas regras de fim de semana e feriado do agendamento automático.
- **Notificação do Telegram corrigida** — substituição de `GM_xmlhttpRequest` por `fetch`, resolvendo o problema em que as notificações não eram enviadas.
- **Mensagem de inicialização inteligente** — ao carregar a página, o script envia uma mensagem no Telegram informando os horários agendados para o dia, ou avisando que não há ação prevista (fim de semana ou feriado).
- **Script de Teste (Test Mode)** — script separado para validar a integração com o Telegram e a lógica de dias sem disparar nenhuma ação real (ver seção acima).

---

## Resumo dos Passos

| Passo | Ação |
|-------|------|
| 1 | Instalar a extensão Tampermonkey no Chrome |
| 2 | Ativar o Modo de Desenvolvedor em `chrome://extensions/` |
| 3 | Permitir Scripts de Usuário nas configurações do Tampermonkey |
| 4 | Instalar o script principal via Greasyfork |
| 5 | Instalar o script de teste (Test Mode) via Greasyfork |
| 6 | Configurar a geolocalização com seus dados reais |
| 7 | Acessar e manter o site do Pontomais aberto e logado |
| 8 | Pressionar `Cmd+Shift+K` para testar a integração com o Telegram |

---

*Em caso de dúvidas ou problemas, consulte a página do script no Greasyfork ou abra uma issue.*
