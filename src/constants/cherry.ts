export const CHERRY_WIDGET_SCRIPT_ID = '_hw' as const;
export const CHERRY_WIDGET_SCRIPT_SRC =
  'https://files.withcherry.com/widgets/widget.js' as const;
export const CHERRY_WIDGET_FONT_LINK_ID = 'cherry-widget-fonts' as const;
export const CHERRY_WIDGET_CONTAINER_ID = 'floatingEstimator' as const;
export const CHERRY_WIDGET_MOUNT_ID = `widget-${CHERRY_WIDGET_CONTAINER_ID}-mount` as const;
export const CHERRY_WIDGET_FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@200..900&family=Slabo+27px:wght@200..900&family=Lato:wght@200..900&family=Raleway:wght@200..900&family=Montserrat:wght@200..900&family=Oswald:wght@200..900&family=Poppins:wght@200..900&family=Source+Sans+Pro:wght@200..900&family=PT+Sans:wght@200..900&family=Open+Sans:wght@200..900&display=swap' as const;
export const CHERRY_WIDGET_SUPPORT_CONTAINER_IDS = [] as const;

// Cherry practice identifier (single source of truth for the widget + apply link).
export const CHERRY_PRACTICE_SLUG = 'exquisite-dentistry-ca' as const;

// Cherry's hosted, patient-facing application page. Opening this is the real
// "apply in ~2 minutes, soft credit check, instant decision" flow Cherry runs.
//
// VERIFY-BEFORE-PUBLIC: confirm this exact URL and the amount query-param name
// against Cherry's provider dashboard for `exquisite-dentistry-ca`. The
// slug-based pattern below is Cherry's standard hosted-application format; if it
// is wrong the patient still lands on the practice apply page, the amount just
// won't prefill (graceful degradation).
export const CHERRY_APPLY_BASE_URL =
  `https://pay.withcherry.com/${CHERRY_PRACTICE_SLUG}` as const;

export interface CherryApplyUrlOptions {
  /** Requested amount in whole dollars; prefilled on the Cherry application. */
  amount?: number;
  /** UTM source so financing applications are attributable in analytics. */
  source?: string;
}

export const buildCherryApplyUrl = ({
  amount,
  source = 'website',
}: CherryApplyUrlOptions = {}): string => {
  const url = new URL(CHERRY_APPLY_BASE_URL);
  url.searchParams.set('utm_source', source);
  url.searchParams.set('utm_medium', 'pre_approval');
  url.searchParams.set('utm_campaign', 'website_financing');

  if (typeof amount === 'number' && Number.isFinite(amount) && amount > 0) {
    // Param name pending Cherry dashboard verification (see note above).
    url.searchParams.set('amount', String(Math.round(amount)));
  }

  return url.toString();
};

export const createCherryWidgetConfig = () => ({
  debug: false,
  variables: {
    slug: CHERRY_PRACTICE_SLUG,
    name: 'Exquisite Dentistry',
    images: '',
    customLogo: '',
    defaultPurchaseAmount: 2000,
    customImage:
      'https://res.cloudinary.com/dhqpqfw6w/image/upload/v1775501920/ex-D_faosrz.jpg',
    imageCategory: 'dental',
    language: 'en',
  },
  styles: {
    primaryColor: '#9a8360',
    secondaryColor: '#9a836010',
    fontFamily: 'Montserrat',
    headerFontFamily: 'Montserrat',
    floatingEstimator: {
      position: 'bottom-right',
      offset: {
        x: '0px',
        y: '0px',
      },
      zIndex: 40,
      ctaFontFamily: 'Montserrat',
      bodyFontFamily: 'Montserrat',
      ctaColor: '#9a8360',
      ctaTextColor: '#FFFFFF',
    },
  },
});
