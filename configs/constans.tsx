import getName from "@/utils/getName"

export const errorCodes = {
  detection: {
    code: "01GLLMD",
    getMessage: (srcLang: string) => `The detected language is different from ${srcLang}, please speak in ${srcLang}.`
  },
  unclear: {
    code: "02GLLMU",
    getMessage: () => "I could not understand the audio clearly, please try again."
  },
  wrong: {
    code: "03GLLMW",
    getMessage: () => "Something went wrong, try again." 
  }
}

export const featureCodes = {
  call: {
    code: "01GLLMC1F1",
    getMessage: (assistantResp: string) => `Calling ${getName(assistantResp)}`
  },
  appOpen: {
    code: "02GLLMA1F2",
    getMessage: (assistantResp: string) => `Opening ${getName(assistantResp)}`
  }
}