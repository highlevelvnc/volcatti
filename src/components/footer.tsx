import { COMPANY, WHATSAPP_URL, NAV_LINKS } from "@/lib/constants";
import { LogoMark } from "./logo";
import { InstagramIcon, MapPinIcon, WhatsAppIcon } from "./icons";
import { NewsletterForm } from "./newsletter-form";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-graphite text-offwhite">
      <div className="max-w-container mx-auto px-5 md:px-8 lg:px-12 pt-20 lg:pt-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr] gap-8 lg:gap-16 pb-16 lg:pb-24">
          <div className="flex flex-col gap-5 max-w-[360px]">
            <a href="#inicio" className="inline-flex items-center gap-3.5 text-offwhite">
              <LogoMark light className="w-9 h-auto" />
              <span className="font-sans font-semibold text-[1.15rem] tracking-[0.2em]">VOLCATTI</span>
            </a>
            <p className="font-display font-light text-[1.05rem] leading-relaxed text-offwhite/70">
              Construção · Remodelação · Piscinas · Elétrica.<br />
              Precisão em cada etapa.
            </p>
            <div className="flex gap-2.5 mt-1">
              {[
                { href: COMPANY.social.instagram, label: "Instagram @volcatti_lda", Icon: InstagramIcon },
                { href: WHATSAPP_URL, label: "WhatsApp", Icon: WhatsAppIcon },
                { href: COMPANY.gmb.mapsUrl, label: "Google Maps", Icon: MapPinIcon },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center justify-center w-10 h-10 border border-offwhite/18 text-offwhite/85 transition-all duration-500 hover:bg-bronze hover:text-graphite hover:border-bronze"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Serviços" links={[
            { label: "Construção Civil", href: "/servicos/construcao-civil" },
            { label: "Remodelações", href: "/servicos/remodelacoes" },
            { label: "Piscinas", href: "/servicos/piscinas" },
            { label: "Casas de Máquina", href: "/servicos/casas-de-maquinas" },
            { label: "Assistência Piscinas", href: "/servicos/assistencia-piscinas" },
            { label: "Elétrica", href: "/servicos/eletrica" },
            { label: "Acabamentos", href: "/servicos/acabamentos" },
            { label: "Manutenção", href: "/servicos/manutencao" },
          ]} />

          <FooterCol title="Navegar" links={NAV_LINKS as unknown as Array<{ label: string; href: string }>} />

          <div className="flex flex-col gap-5">
            <h4 className="font-mono text-[0.72rem] font-medium tracking-[0.18em] uppercase text-bronze pb-3.5 border-b border-offwhite/12">
              Contacto
            </h4>
            <ul className="flex flex-col gap-4">
              <ContactItem label="Telefone" value={COMPANY.phone} href={`tel:${COMPANY.phoneCompact}`} />
              <ContactItem label="WhatsApp" value={COMPANY.phone} href={WHATSAPP_URL} />
              <ContactItem label="Email" value={COMPANY.email} href={`mailto:${COMPANY.email}`} />
              <li className="flex flex-col gap-0.5">
                <span className="font-mono text-[0.66rem] tracking-[0.14em] uppercase text-offwhite/45">Sede</span>
                <a
                  href={COMPANY.gmb.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="text-[0.95rem] text-offwhite/85 hover:text-bronze transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  {COMPANY.region}
                  <svg viewBox="0 0 16 16" width="10" height="10" fill="none" aria-hidden="true">
                    <path d="M6 3h7v7M13 3 4 12" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </a>
              </li>
            </ul>
            <div className="pt-4 border-t border-offwhite/12">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="hairline-light" />
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6 py-7">
          <div className="font-mono text-[0.66rem] tracking-[0.14em] uppercase text-offwhite/55 flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <span>© {year} {COMPANY.name}.</span>
            <a href="/privacidade" className="hover:text-bronze transition-colors duration-300">Privacidade</a>
            <a href="/termos" className="hover:text-bronze transition-colors duration-300">Termos</a>
            <a href="/cookies" className="hover:text-bronze transition-colors duration-300">Cookies</a>
            <span>NIPC {COMPANY.nipc}</span>
          </div>
          <span className="font-mono text-[0.66rem] tracking-[0.14em] uppercase text-bronze">
            Construção · Remodelação · Piscinas · Elétrica
          </span>
        </div>

        {/* Built by — credit */}
        <div className="border-t border-offwhite/8 py-5 flex items-center justify-center">
          <a
            href="https://highlevelmkt.com"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.2em] uppercase text-offwhite/35 hover:text-bronze transition-colors duration-300"
            data-cursor="Visitar"
          >
            <span>Site by</span>
            <span className="text-offwhite/55 group-hover:text-bronze transition-colors duration-300">
              highlevelmkt.com
            </span>
            <svg viewBox="0 0 16 16" width="10" height="10" fill="none" aria-hidden="true">
              <path d="M6 3h7v7M13 3 4 12" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<{ label: string; href: string }> }) {
  return (
    <div>
      <h4 className="font-mono text-[0.72rem] font-medium tracking-[0.18em] uppercase text-bronze mb-5 pb-3.5 border-b border-offwhite/12">
        {title}
      </h4>
      <ul className="flex flex-col gap-3">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-[0.92rem] text-offwhite/70 transition-[color,padding-left] duration-300 hover:text-bronze hover:pl-1.5"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContactItem({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <li className="flex flex-col gap-0.5">
      <span className="font-mono text-[0.66rem] tracking-[0.14em] uppercase text-offwhite/45">{label}</span>
      <a href={href} className="text-[0.95rem] text-offwhite/85 hover:text-bronze transition-colors duration-300">
        {value}
      </a>
    </li>
  );
}
