const POA_CORAL_BLUE = "#679ba1"
const POA_DARK_RED = "#f55d3e"

const GROMMET_THEME = {
  global: {
    colors: {
      control: POA_DARK_RED,
      brand: POA_CORAL_BLUE
    }
  },
  // TODO Can some of this be more specific?
  button: {
    primary: {
      extend: {
        color: "white",
      }
    },
    extend: {
      // Center the label within the button
      alignItems: "center",
      direction: "column",
      justifyContent: "center",

      // Make it square
      borderRadius: "0",

      // Lower max-width
      maxWidth: "12rem",

      // Match the padding of the design
      padding: "15px 2rem !important",
      textTransform: "uppercase"
    }
  },
  heading: {
    weight: 300
  },
  anchor: {
    color: {
      light: POA_CORAL_BLUE
    }
  },
  radioButton: {
    color: POA_CORAL_BLUE,
    border: {
      color: POA_CORAL_BLUE
    },
    hover: {
      border: {
        color: POA_CORAL_BLUE
      }
    }
  }
}

export {
  POA_CORAL_BLUE,
  GROMMET_THEME
}