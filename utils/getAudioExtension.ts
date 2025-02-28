const getAudioExtension = (uri: string) => {
    const MIME_TYPES = {
        m4a: "audio/m4a",
        mp3: "audio/mpeg",
        wav: "audio/wav",
        webm: "audio/webm",
        ogg: "audio/ogg",
        aac: "audio/aac",
      };
    
      const fileExtension = uri.split(".").pop()?.toLowerCase();
      const mimeType = MIME_TYPES[fileExtension as keyof typeof MIME_TYPES] || MIME_TYPES.webm;
      return mimeType
}

export default getAudioExtension;