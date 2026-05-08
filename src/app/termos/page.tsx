import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { COMPANY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Termos & Condições",
  description: "Termos e condições de utilização do site da Volcatti e dos serviços contratados.",
  alternates: { canonical: `${COMPANY.url}/termos` },
};

export default function Termos() {
  return (
    <>
      <Header />
      <LegalPage
        num="02"
        kicker="Termos & Condições"
        title="Como trabalhamos consigo."
        subtitle="Estes termos regem o uso deste site e a relação contratual com a Volcatti. Lê-los antes de avançar é boa prática — assim não há surpresas."
        updated="Maio 2026"
      >
        <h2>Identificação</h2>
        <p>
          Site operado pela <strong>{COMPANY.name}</strong>, com sede em {COMPANY.region}.
          Contacto: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
          NIPC {COMPANY.nipc}.
        </p>

        <h2>Uso do <em>site</em></h2>
        <p>
          O conteúdo deste site (textos, fotografias, vídeos, código) é propriedade
          da Volcatti ou licenciado. Pode consultar livremente, mas a reprodução
          comercial sem autorização escrita não é permitida.
        </p>
        <ul>
          <li>Não podem ser usados scrapers automatizados em massa</li>
          <li>Não podem ser tentadas ações que comprometam a segurança ou disponibilidade</li>
          <li>Não pode ser feita engenharia reversa do código</li>
        </ul>

        <h2>Pedidos de orçamento</h2>
        <p>
          O preenchimento do formulário ou contacto via WhatsApp/email <strong>não constitui
          contrato</strong>. É um pedido de proposta. A Volcatti pode aceitar ou recusar,
          dentro dos seus critérios técnicos e de capacidade de equipa.
        </p>
        <p>
          Os orçamentos enviados têm validade de <strong>30 dias</strong>, salvo indicação
          em contrário. Após esse período podem ser revistos por flutuação de preços
          de materiais ou disponibilidade.
        </p>

        <h2>Adjudicação e contrato</h2>
        <ol>
          <li>Aprovação do orçamento por escrito (email ou contrato assinado)</li>
          <li>Pagamento de sinal (tipicamente 30%)</li>
          <li>Cronograma e plano de obra acordados</li>
          <li>Início da execução em data combinada</li>
        </ol>
        <p>
          Para obras com licenciamento ou comunicação prévia, o início depende da
          aprovação camarária — comunicamos prazos previstos mas não controlamos
          o ritmo das entidades públicas.
        </p>

        <h2>Pagamento</h2>
        <p>Por defeito, em 4 etapas com validação:</p>
        <ul>
          <li><strong>30 %</strong> à adjudicação</li>
          <li><strong>30 %</strong> a meio da execução</li>
          <li><strong>30 %</strong> antes da entrega final</li>
          <li><strong>10 %</strong> após vistoria conjunta e correção de pontos pendentes</li>
        </ul>
        <p>
          Pagamentos por transferência bancária com fatura. Atrasos superiores a 15 dias
          podem implicar suspensão de obra até regularização.
        </p>

        <h2>Garantias</h2>
        <ul>
          <li><strong>5 anos</strong> sobre estrutura e impermeabilizações</li>
          <li><strong>2 anos</strong> sobre instalações elétricas e canalização</li>
          <li><strong>1 ano</strong> sobre acabamentos e equipamentos</li>
        </ul>
        <p>
          Garantias cobrem defeitos de execução. Não cobrem desgaste normal, intervenções
          de terceiros após entrega, ou danos por uso indevido. Termos detalhados constam
          do contrato de cada obra.
        </p>

        <h2>Responsabilidade</h2>
        <p>
          A Volcatti tem seguro de responsabilidade civil profissional ativo.
          Em caso de dano em obra ou após a entrega que seja imputável à empresa,
          ressarcimos nos termos legais e do seguro contratado.
        </p>
        <p>
          Não somos responsáveis por:
        </p>
        <ul>
          <li>Atrasos por causas externas (fornecedores, câmara, condições atmosféricas extremas)</li>
          <li>Defeitos em materiais fornecidos pelo cliente</li>
          <li>Danos posteriores a intervenções de terceiros</li>
        </ul>

        <h2>Cancelamento</h2>
        <p>
          O cliente pode cancelar a obra antes do início, perdendo o sinal pago.
          Cancelamentos durante a execução implicam pagamento do trabalho realizado e
          dos materiais já encomendados. Indemnizamos os custos de mobilização da equipa
          se o cancelamento for da nossa parte por causa não imputável ao cliente.
        </p>

        <h2>Resolução de conflitos</h2>
        <p>
          Privilegiamos a resolução amigável. Se não for possível, é competente o
          foro da comarca de Lisboa, com expressa renúncia a qualquer outro.
        </p>
        <p>
          Aplicam-se as leis portuguesas. Para litígios de consumo, o cliente pode
          recorrer ao <a href="https://www.consumidor.gov.pt" target="_blank" rel="noopener">Centro de Arbitragem de Consumo</a>.
        </p>

        <h2>Alterações</h2>
        <p>
          Estes termos podem ser revistos. A versão em vigor é sempre a publicada nesta página.
          Para contratos já adjudicados, aplica-se a versão à data da adjudicação.
        </p>
      </LegalPage>
      <Footer />
    </>
  );
}
