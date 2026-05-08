import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como a Volcatti recolhe, utiliza e protege os seus dados pessoais nos termos do RGPD.",
  alternates: { canonical: `${COMPANY.url}/privacidade` },
};

export default function Privacidade() {
  return (
    <>
      <Header />
      <LegalPage
        num="01"
        kicker="Política de Privacidade"
        title="A sua privacidade, em termos claros."
        subtitle="A Volcatti respeita os seus dados. Este documento explica que dados recolhemos, porquê, durante quanto tempo, e que controlo tem sobre eles."
        updated="Maio 2026"
      >
        <h2>Quem somos</h2>
        <p>
          A <strong>Volcatti</strong> é responsável pelo tratamento dos seus dados pessoais.
          Sede em {COMPANY.region}. Para qualquer questão sobre privacidade, contacte-nos
          em <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>

        <h2>Que <em>dados</em> recolhemos</h2>
        <ul>
          <li><strong>Pedido de orçamento</strong> — nome, email, telefone (opcional), serviço pretendido e descrição do projeto.</li>
          <li><strong>Newsletter</strong> — apenas o email.</li>
          <li><strong>Analítica do site</strong> — métricas agregadas de uso (páginas visitadas, tempo, dispositivo) sem identificar individualmente o visitante. Recolhidas pela Vercel Analytics.</li>
          <li><strong>Logs técnicos</strong> — endereço IP e user agent são processados pela CDN para fins de segurança e disponibilidade.</li>
        </ul>

        <h2>Para <em>quê</em></h2>
        <ol>
          <li><strong>Responder ao seu pedido</strong> — tratamento dos dados do formulário com base no seu interesse legítimo em obter um orçamento.</li>
          <li><strong>Enviar comunicações</strong> sobre obras concluídas, novos serviços ou novidades técnicas (apenas se subscrever a newsletter, com consentimento explícito).</li>
          <li><strong>Cumprir obrigações legais</strong> — emissão de fatura, contabilidade, garantias.</li>
          <li><strong>Melhorar o site</strong> — análise estatística agregada e anónima.</li>
        </ol>

        <h2>Quanto tempo guardamos</h2>
        <ul>
          <li>Pedidos de orçamento sem adjudicação: <strong>até 2 anos</strong> (caso queira retomar).</li>
          <li>Clientes ativos: durante toda a relação contratual + <strong>10 anos</strong> após o fim, conforme legislação fiscal e civil.</li>
          <li>Newsletter: enquanto subscrito + 30 dias após cancelamento.</li>
          <li>Analítica: dados anónimos sem prazo definido (não são pessoais).</li>
        </ul>

        <h2>Com quem partilhamos</h2>
        <p>
          Não vendemos nem cedemos os seus dados a terceiros. Apenas processadores
          essenciais ao serviço:
        </p>
        <ul>
          <li><strong>Resend</strong> (UE) — entrega dos emails do formulário de contacto.</li>
          <li><strong>Vercel</strong> (UE/EUA) — alojamento do site e analítica anónima.</li>
          <li><strong>Contabilista certificado</strong> e Autoridade Tributária — para clientes com fatura emitida.</li>
        </ul>

        <h2>Os seus direitos</h2>
        <p>Nos termos do RGPD, pode em qualquer momento:</p>
        <ul>
          <li>Aceder aos dados que temos sobre si</li>
          <li>Pedir a correção de dados incorretos</li>
          <li>Pedir o apagamento (direito ao esquecimento)</li>
          <li>Pedir a portabilidade dos seus dados</li>
          <li>Opor-se ao tratamento ou pedir limitação</li>
          <li>Retirar o consentimento (sem afetar tratamentos já feitos)</li>
          <li>Apresentar queixa à <a href="https://www.cnpd.pt" target="_blank" rel="noopener">CNPD</a></li>
        </ul>
        <p>
          Para exercer qualquer destes direitos, envie email a <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          Respondemos em até 30 dias.
        </p>

        <h2>Cookies</h2>
        <p>
          Usamos um conjunto mínimo de cookies para funcionamento do site e analítica anónima.
          Pode ler a <a href="/cookies">Política de Cookies</a> ou rever a sua preferência
          a qualquer momento.
        </p>

        <h2>Segurança</h2>
        <p>
          Aplicamos medidas técnicas e organizativas adequadas: ligação cifrada (HTTPS/TLS),
          acesso restrito aos dados, processadores RGPD-compliant. Em caso de violação que
          possa afetar os seus direitos, notificamos a CNPD e os titulares afetados em até 72h.
        </p>

        <h2>Alterações</h2>
        <p>
          Esta política pode ser atualizada para refletir alterações legais ou no serviço.
          A versão em vigor é sempre a mais recente publicada nesta página.
        </p>
      </LegalPage>
      <Footer />
    </>
  );
}
