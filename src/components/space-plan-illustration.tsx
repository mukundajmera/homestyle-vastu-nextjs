export function SpacePlanIllustration({ variant = 'default' }: { variant?: 'default' | 'alt' }) {
  const isAlt = variant === 'alt';

  return (
    <figure className="relative mx-auto w-full max-w-[34rem]">
      <div className={`relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-[#dfd5c7] shadow-[0_24px_70px_-38px_rgba(54,39,25,0.35)] ${isAlt ? 'bg-[#eef2ef]' : 'bg-[#f3ede3]'}`}>
        <div className={`absolute -right-14 -top-16 h-56 w-56 rounded-full blur-2xl ${isAlt ? 'bg-[#99a98d]/40' : 'bg-[#e9bd65]/35'}`} />
        <div className={`absolute -bottom-16 -left-14 h-56 w-56 rounded-full blur-2xl ${isAlt ? 'bg-[#e9bd65]/35' : 'bg-[#99a98d]/40'}`} />
        <svg
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 560 448"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {isAlt ? (
             <g opacity=".22" stroke="#6b7c6a" strokeWidth="1">
              <path d="M0 56H560M0 112H560M0 168H560M0 224H560M0 280H560M0 336H560M0 392H560" />
              <path d="M56 0V448M112 0V448M168 0V448M224 0V448M280 0V448M336 0V448M392 0V448M448 0V448M504 0V448" />
            </g>
          ) : (
             <g opacity=".22" stroke="#897966" strokeWidth="1">
              <path d="M0 56H560M0 112H560M0 168H560M0 224H560M0 280H560M0 336H560M0 392H560" />
              <path d="M56 0V448M112 0V448M168 0V448M224 0V448M280 0V448M336 0V448M392 0V448M448 0V448M504 0V448" />
            </g>
          )}

          {isAlt ? (
             <rect x="134" y="61" width="342" height="324" rx="5" fill="#FCFAF5" stroke="#3d493e" strokeWidth="5" />
          ) : (
            <rect x="84" y="61" width="342" height="324" rx="5" fill="#FCFAF5" stroke="#4B4942" strokeWidth="5" />
          )}

          {isAlt ? (
            <path d="M134 204H257V61M257 204H476M356 204V385M257 292H356M257 292V385" stroke="#3d493e" strokeWidth="5" />
          ) : (
            <path d="M84 204H207V61M207 204H426M306 204V385M207 292H306M207 292V385" stroke="#4B4942" strokeWidth="5" />
          )}

          {isAlt ? (
            <>
              <path d="M141 68H250V197H141V68Z" fill="#8DA18A" fillOpacity=".38" />
              <path d="M363 68H469V197H363V68Z" fill="#E8B957" fillOpacity=".35" />
              <path d="M141 212H250V378H141V212Z" fill="#E8B957" fillOpacity=".24" />
              <path d="M363 212H469V378H363V212Z" fill="#C67555" fillOpacity=".22" />
              <path d="M172 198V211M275 198V211M344 198V211M419 198V211M250 120H263M250 330H263M349 250H362" stroke="#FCFAF5" strokeWidth="8" />
              <path d="M192 61V86M134 145H158M418 385V360M476 279H452" stroke="#3d493e" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <path d="M91 68H200V197H91V68Z" fill="#E8B957" fillOpacity=".38" />
              <path d="M313 68H419V197H313V68Z" fill="#8DA18A" fillOpacity=".35" />
              <path d="M91 212H200V378H91V212Z" fill="#C67555" fillOpacity=".24" />
              <path d="M313 212H419V378H313V212Z" fill="#E8B957" fillOpacity=".22" />
              <path d="M122 198V211M225 198V211M294 198V211M369 198V211M200 120H213M200 330H213M299 250H312" stroke="#FCFAF5" strokeWidth="8" />
              <path d="M142 61V86M84 145H108M368 385V360M426 279H402" stroke="#C67555" strokeWidth="4" strokeLinecap="round" />
            </>
          )}

          {isAlt ? (
            <>
              <circle cx="82" cy="112" r="52" fill="#FCFAF5" stroke="#b4c2b2" strokeWidth="2" />
              <circle cx="82" cy="112" r="38" stroke="#3d493e" strokeWidth="1.5" />
              <path d="M82 82L92 114L82 108L72 114L82 82Z" fill="#C67555" />
              <path d="M82 142L72 110L82 116L92 110L82 142Z" fill="#71836F" />
              <path d="M82 66V76M82 148V158M36 112H46M118 112H128" stroke="#3d493e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="82" cy="112" r="4" fill="#3d493e" />
              <path d="M64 404H494" stroke="#6b7c6a" strokeOpacity=".5" strokeDasharray="3 7" />
              <circle cx="494" cy="404" r="4" fill="#E8B957" />
            </>
          ) : (
            <>
              <circle cx="462" cy="112" r="52" fill="#FCFAF5" stroke="#D8CBB8" strokeWidth="2" />
              <circle cx="462" cy="112" r="38" stroke="#C67555" strokeWidth="1.5" />
              <path d="M462 82L472 114L462 108L452 114L462 82Z" fill="#C67555" />
              <path d="M462 142L452 110L462 116L472 110L462 142Z" fill="#71836F" />
              <path d="M462 66V76M462 148V158M416 112H426M498 112H508" stroke="#4B4942" strokeWidth="2" strokeLinecap="round" />
              <circle cx="462" cy="112" r="4" fill="#4B4942" />
              <path d="M64 404H494" stroke="#897966" strokeOpacity=".5" strokeDasharray="3 7" />
              <circle cx="64" cy="404" r="4" fill="#C67555" />
            </>
          )}

        </svg>
        <span className="absolute left-5 top-5 rounded-full border border-white/70 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[#51493f] shadow-sm backdrop-blur-sm sm:left-7 sm:top-7">
          Illustrative space plan
        </span>
        <span className={`absolute bottom-5 grid h-11 w-11 place-items-center rounded-full bg-[#4f654f] text-sm font-semibold text-white shadow-md sm:bottom-7 ${isAlt ? 'left-5 sm:left-7' : 'right-5 sm:right-7'}`}>
          N
        </span>
      </div>
      <figcaption className="sr-only">An abstract room plan and compass illustration, not a property drawing.</figcaption>
    </figure>
  );
}
