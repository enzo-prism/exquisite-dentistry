export const CHERRY_WIDGET_SCRIPT_ID = '_hw' as const;
export const CHERRY_WIDGET_SCRIPT_SRC =
  'https://files.withcherry.com/widgets/widget.js' as const;
export const CHERRY_WIDGET_FONT_LINK_ID = 'cherry-widget-fonts' as const;
export const CHERRY_WIDGET_FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap' as const;
export const CHERRY_WIDGET_SUPPORT_CONTAINER_IDS = ['testimony'] as const;

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
  },
});
