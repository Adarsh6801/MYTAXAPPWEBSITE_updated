const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "#3366ff", // primary color for all components
              "@success-color": "#52c41a", // success state color
              "@warning-color": "#faad14", // warning state color
              "@error-color": "#f5222d", // error state color
              "@font-size-base": "14px", // major text font size
              "@heading-color": "#101840", // heading text color
              "@text-color": "#181818", // major text color
              "@text-color-secondary": "#393e43", // secondary text color
              "@disabled-color": "rgba(0, 0, 0, 0.25)", // disable state color
              "@border-radius-base": "4px", // major border radius
              "@border-color-base": "hsv(0, 0, 85%)", // major border color
              "@box-shadow-base":
                "0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)", // major shadow for layers

              // LINK
              "@link-color": "#0032da",
              "@link-hover-color":
                "color(~`colorPalette('@{link-color}', 5) `)",
              "@link-active-color":
                "color(~`colorPalette('@{link-color}', 7) `)",
              "@link-decoration": "none",
              "@link-hover-decoration": "none",
              "@link-focus-decoration": "none",
              "@link-focus-outline": "0",

              // Buttons
              "@btn-font-weight": "500",
              "@btn-border-radius-base": "@border-radius-base",
              "@btn-border-radius-sm": "@border-radius-base",
              "@btn-border-width": "@border-width-base",
              "@btn-border-style": "@border-style-base",
              "@btn-shadow": "0 2px 0 rgba(0, 0, 0, 0.015)",
              "@btn-primary-shadow": "0 2px 0 rgba(0, 0, 0, 0.045)",
              "@btn-text-shadow": "0 -1px 0 rgba(0, 0, 0, 0.12)",

              "@btn-primary-color": "#fff",
              "@btn-primary-bg": "#3f65e4",

              "@btn-default-color": "#0032da",
              "@btn-default-bg": "#fff",
              "@btn-default-border": "#0032da",

              "@btn-danger-color": "#fff",
              "@btn-danger-bg": "@error-color",
              "@btn-danger-border": "@error-color",

              "@btn-disable-color": "@disabled-color",
              "@btn-disable-bg": "@disabled-bg",
              "@btn-disable-border": "@border-color-base",

              "@btn-default-ghost-color": "#0032da",
              "@btn-default-ghost-bg": "transparent",
              "@btn-default-ghost-border": "#0032da",

              "@btn-font-size-lg": "@font-size-lg",
              "@btn-font-size-sm": "@font-size-base",
              "@btn-padding-horizontal-base": "@padding-md - 1px",
              "@btn-padding-horizontal-lg": "@btn-padding-horizontal-base",
              "@btn-padding-horizontal-sm": "@padding-xs - 1px",

              "@btn-height-base": "@height-base",
              "@btn-height-lg": "@height-lg",
              "@btn-height-sm": "@height-sm",

              "@btn-line-height": "@line-height-base",

              "@btn-circle-size": "@btn-height-base",
              "@btn-circle-size-lg": "@btn-height-lg",
              "@btn-circle-size-sm": "@btn-height-sm",

              "@btn-square-size": "@btn-height-base",
              "@btn-square-size-lg": "@btn-height-lg",
              "@btn-square-size-sm": "@btn-height-sm",
              "@btn-square-only-icon-size": "@font-size-base + 2px",
              "@btn-square-only-icon-size-sm": "@font-size-base",
              "@btn-square-only-icon-size-lg": "@btn-font-size-lg + 2px",

              "@btn-group-border": "@primary-5",

              "@btn-link-hover-bg": "transparent",
              "@btn-text-hover-bg": "rgba(0, 0, 0, 0.018)",

              // Input
              "@input-height-lg": "@height-lg",
              "@input-height-base": "@height-base",
              "@input-height-sm": "@height-sm",
              "@input-padding-horizontal": "@control-padding-horizontal - 1px",
              "@input-padding-horizontal-base": "@input-padding-horizontal",
              "@input-padding-horizontal-sm":
                "@control-padding-horizontal-sm - 1px",
              "@input-padding-horizontal-lg": "@input-padding-horizontal",
              "@input-padding-vertical-base":
                "max((round(((@input-height-base - @font-size-base * @line-height-base) / 2) * 10) / 10) -@border-width-base,3px)",
              "@input-padding-vertical-sm":
                "max((round(((@input-height-sm - @font-size-base * @line-height-base) / 2) * 10) / 10) -@border-width-base,0)",
              "@input-padding-vertical-lg":
                "(ceil(((@input-height-lg - @font-size-lg * @line-height-base) / 2) * 10) / 10  ) - @border-width-base",
              "@input-placeholder-color": "hsv(0, 0, 75%)",
              "@input-color": "#101840",
              "@input-icon-color": "@input-color",
              "@input-border-color": "@border-color-base",
              "@input-bg": "@component-background",
              "@input-number-hover-border-color": "@input-hover-border-color",
              "@input-number-handler-active-bg": "#f4f4f4",
              "@input-number-handler-hover-bg": "@primary-5",
              "@input-number-handler-bg": "@component-background",
              "@input-number-handler-border-color": "@border-color-base",
              "@input-addon-bg": "@background-color-light",
              "@input-hover-border-color": "@primary-5",
              "@input-disabled-bg": "@disabled-bg",
              "@input-outline-offset": "0 0",
              "@input-icon-hover-color": "fade(@black, 85%)",
              "@input-disabled-color": "@disabled-color",

              // Table 
              "@table-bg": "@component-background",
              "@table-header-bg": "#FAFBFF",
              "@table-header-color": "@heading-color",
              "@table-header-sort-bg": "@background-color-base",
              "@table-body-sort-bg": "#FAFAFA",
              "@table-row-hover-bg": "@background-color-light",
              "@table-selected-row-color": "inherit",
              "@table-selected-row-bg": "@primary-1",
              "@table-body-selected-sort-bg": "@table-selected-row-bg",
              "@table-selected-row-hover-bg": "darken(@table-selected-row-bg, 2%)",
              "@table-expanded-row-bg": "#FBFBFB",
              "@table-padding-vertical": "16px",
              "@table-padding-horizontal": "16px",
              "@table-padding-vertical-md": "(@table-padding-vertical * 3 / 4)",
              "@table-padding-horizontal-md": "(@table-padding-horizontal / 2)",
              "@table-padding-vertical-sm": "(@table-padding-vertical / 2)",
              "@table-padding-horizontal-sm": "(@table-padding-horizontal / 2)",
              "@table-border-color": "@border-color-split",
              "@table-border-radius-base": "20px",
              "@table-footer-bg": "@background-color-light",
              "@table-footer-color": "@heading-color",
              "@table-header-bg-sm": "@table-header-bg",
              "@table-font-size": "@font-size-base",
              "@table-font-size-md": "@table-font-size",
              "@table-font-size-sm": "@table-font-size",
              "@table-header-cell-split-color": "rgba(0, 0, 0, 0.06)",
              // Sorter
              // Legacy": `table-header-sort-active-bg` is used for hover not real active
              "@table-header-sort-active-bg": "rgba(0, 0, 0, 0.04)",
              "@table-fixed-header-sort-active-bg": "hsv(0, 0, 96%)",
              // Filter
              "@table-header-filter-active-bg": "rgba(0, 0, 0, 0.04)", 
              "@table-filter-btns-bg": "inherit",
              "@table-filter-dropdown-bg": "@component-background",
              "@table-expand-icon-bg": "@component-background",
              "@table-selection-column-width": "32px",
              // Sticky
              "@table-sticky-scroll-bar-bg": "fade(#000, 35%)",
              "@table-sticky-scroll-bar-radius": "4px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
