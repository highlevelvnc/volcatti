import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Política de Cookies",
  description: "Que cookies usamos no site da Volcatti, com que finalidade e como pode rever a sua preferência.",
  alternates: { canonical: `${COMPANY.url}/cookies` },
};

export default function Cookies() {
  return (
    <>
      <Header />
      <LegalPage
        num="03"
        kicker="Política de Cookies"
        title="Cookies que usamos. E porquê."
        subtitle="Cookies são pequenos ficheiros guardados no seu dispositivo. Aqui está o que guardamos, durante quanto tempo, e como pode controlar."
        updated="Maio 2026"
      >
        <h2>O que são <em>cookies</em></h2>
        <p>
          Cookies são pequenos ficheiros de texto que o site coloca no seu navegador
          para reconhecer preferências, manter sessões ou recolher estatísticas.
          Não acedem ao seu disco nem têm informação pessoal sensível.
        </p>

        <h2>Que cookies usamos</h2>

        <h3>Essenciais</h3>
        <p>Necessários para o funcionamento do site. Sempre ativos.</p>
        <ul>
          <li><code>volcatti.cookies</code> — guarda a sua escolha do banner (aceitar/recusar). Local. <strong>365 dias</strong>.</li>
          <li>Cookies de sessão da CDN (Vercel) — para servir o site rapidamente.</li>
        </ul>

        <h3>Analítica anónima</h3>
        <p>Vercel Analytics e Speed Insights — recolha agregada e anónima.</p>
        <ul>
          <li>Páginas visitadas, tempo de permanência, dispositivo (mobile/desktop)</li>
          <li>Tempo de carregamento (Web Vitals: LCP, INP, CLS)</li>
          <li>Não usamos identificadores únicos do utilizador</li>
          <li>Não fazemos rastreio entre sessões</li>
          <li>Não vendemos nem partilhamos com terceiros</li>
        </ul>

        <h3>Marketing & redes sociais</h3>
        <p>
          <strong>Não usamos.</strong> Não há Pixel da Meta, Google Ads, ou tracking
          de campanhas publicitárias.
        </p>

        <h2>Como controlar</h2>
        <p>Tem várias opções:</p>
        <ol>
          <li>O banner de cookies aparece na sua primeira visita — pode aceitar ou recusar</li>
          <li>Recusando, a analítica anónima não é recolhida (apenas os essenciais)</li>
          <li>Pode limpar os cookies em qualquer altura nas definições do seu navegador</li>
          <li>Pode bloquear cookies por defeito nas definições do navegador (modo &quot;Não rastrear&quot; / DNT)</li>
        </ol>

        <h2>Browsers</h2>
        <p>Como gerir cookies nos principais navegadores:</p>
        <ul>
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a></li>
          <li><a href="https://support.mozilla.org/pt-PT/kb/ative-e-desative-cookies-monitorizam" target="_blank" rel="noopener">Firefox</a></li>
          <li><a href="https://support.apple.com/pt-pt/guide/safari/sfri11471/mac" target="_blank" rel="noopener">Safari</a></li>
          <li><a href="https://support.microsoft.com/pt-pt/microsoft-edge" target="_blank" rel="noopener">Edge</a></li>
        </ul>

        <h2>Mais informação</h2>
        <p>
          Sobre como tratamos dados em geral, leia a nossa{" "}
          <a href="/privacidade">Política de Privacidade</a>.
        </p>
        <p>
          Para qualquer questão: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
      </LegalPage>
      <Footer />
    </>
  );
}
