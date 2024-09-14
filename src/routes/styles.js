export const navigationStyle = ({theme: {colors} = {}} = {}) => {
  return {
    leftMenu: {
      flex: 1,
      backgroundColor: colors.SURFACE2,
      overflow: 'hidden',
    },
    sm: {
      stack: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: colors.BACKGROUND,
        padding: 16,
      },
    },
    md: {
      stack: {
        flex: 1,
        overflow: 'hidden',
        backgroundColor: colors.BACKGROUND,
        padding: 20,
      },
    },
    modal: {
      backgroundColor: colors.MODAL_BACKGROUND,
    },
  };
};
