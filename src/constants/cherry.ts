export const CHERRY_WIDGET_SCRIPT_ID = '_hw' as const;
export const CHERRY_WIDGET_SCRIPT_SRC =
  'https://files.withcherry.com/widgets/widget.js' as const;
export const CHERRY_WIDGET_FONT_LINK_ID = 'cherry-widget-fonts' as const;
export const CHERRY_WIDGET_FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@200..900&family=Slabo+27px:wght@200..900&family=Lato:wght@200..900&family=Raleway:wght@200..900&family=Montserrat:wght@200..900&family=Oswald:wght@200..900&family=Poppins:wght@200..900&family=Source+Sans+Pro:wght@200..900&family=PT+Sans:wght@200..900&family=Open+Sans:wght@200..900&display=swap' as const;
export const CHERRY_WIDGET_SUPPORT_CONTAINER_IDS = [] as const;

export const createCherryWidgetConfig = () => ({
  debug: false,
  variables: {
    slug: 'exquisite-dentistry-ca',
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
      zIndex: 9999,
      ctaFontFamily: 'Montserrat',
      bodyFontFamily: 'Montserrat',
      ctaColor: '#9a8360',
      ctaTextColor: '#FFFFFF',
    },
  },
});
