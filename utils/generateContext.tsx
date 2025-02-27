const generateContext = (srcLang?: string, targetLang?: string) => {
    const responseFormat = "Give response as json response where there will be two keys one is user which has value of transcribed user audio and the response text with the key of assistant."
    if(srcLang && targetLang){
        return `First, detect the spoken language. If the language is ${srcLang}, give response for it in ${targetLang}. If not, respond with "The detected language is different from ${srcLang}. Please try again with the correct language."` + responseFormat 
    }
    return "Generate a response of the speech. If you cannot understand, just respond with 'Something went wrong'." + responseFormat
}