import { errorCodes, featureCodes } from "@/configs/constans"

const generateContext = (srcLang?: string, targetLang?: string) => {
    const responseFormat = "Give response as json response where there will be two keys one is user which has value of transcribed user audio and the response text with the key of assistant."
    
    if (srcLang && targetLang) {
      return `
**TASK:** Translate spoken audio from ${srcLang} to ${targetLang} with strict error handling.

**INPUT:** Spoken audio (transcribed text).

**OUTPUT:** A JSON object with the following structure: ${responseFormat}

**RULES:**

1.  **Language Detection (Crucial):**
    * First, and absolutely first, verify the language of the input audio.
    * If the detected language is NOT EXACTLY "${srcLang}", IMMEDIATELY return ONLY:
        * \`${JSON.stringify({ user: "<transcribed_user_audio>", assistant: errorCodes.detection.code })}\`
        * Do NOT proceed further.
2.  **Audio Clarity Check (Essential):**
    * If the language is "${srcLang}", assess the audio's clarity.
    * If the audio is unclear, noisy, or untranscribable, IMMEDIATELY return ONLY:
        * \`${JSON.stringify({ user: "<transcribed_user_audio>", assistant: errorCodes.unclear.code })}\`
        * Do NOT attempt any translation.
3.  **Translation (Primary Goal):**
    * If the language is "${srcLang}" AND the audio is clear, translate the input audio into "${targetLang}".
    * Return ONLY a JSON object:
        * \`${JSON.stringify({ user: "<transcribed_user_audio>", assistant: "<translated_text>" })}\`
        * Replace \`<translated_text>\` with the translated text in "${targetLang}".

**CONSTRAINTS (Critical):**

* **Absolute Language Matching:** Language detection MUST be precise.
* **No Guessing:** Do NOT attempt to interpret unclear audio.
* **Strict JSON Format:** All responses MUST be valid JSON.
* **No Extraneous Output:** Do NOT add any extra text or explanations.
* **Error Codes Only:** For errors, return ONLY the specified error codes.
* **Direct JSON Return:** return the json string directly, do not use template literals to construct the json.

**Example Scenarios (Illustrative):**

* **${srcLang} Audio, ${srcLang} = ${targetLang}:**
    * Response: \`${JSON.stringify({ user: "[transcribed_user_audio]", assistant: errorCodes.detection.code })}\`
* **Unclear Audio:**
    * Response: \`${JSON.stringify({ assistant: errorCodes.unclear.code })}\`
* **Noisy Audio:**
    * Response: \`${JSON.stringify({ assistant: errorCodes.unclear.code })}\`
* **Clear Audio:**
    * Response: \`${JSON.stringify({ user: "[transcribed_user_audio]", assistant: "<translated_text_in_${targetLang}>" })}\`
    `
    }
    
  return `
  **TASK:** Execute call and application opening commands from spoken audio, or provide a general response.
  
  **INPUT:** Spoken audio (transcribed text).
  
  **OUTPUT:** A JSON object with the following structure: ${responseFormat}
  
  **RULES (Mandatory):**
  
  1.  **Intent Recognition (Critical):**
      * **IMMEDIATELY** analyze the spoken audio to determine the user's intent.
      * If the user **DIRECTLY** requests to make a call, **EXTRACT** the contact name.
      * If the user **DIRECTLY** requests to open an application, **EXTRACT** the application name.
  2.  **Call Command (Execute):**
      * If the user's **EXPLICIT** intent is to make a call, **RETURN ONLY**:
          * \`{"user": "<transcribed_user_audio>", "assistant": "${featureCodes.call.code} Call [contact_name]"}\`
          * **REPLACE** \`[contact_name]\` with the **EXACT** name the user provided.
          * **DO NOT** add any other text and response **MUST BE** in English for BOTH user and assistant.
  3.  **Application Opening Command (Execute):**
      * If the user's **EXPLICIT** intent is to open an application, **RETURN ONLY**:
          * \`{"user": "<transcribed_user_audio>", "assistant": "${featureCodes.appOpen.code} Open [application_name]"}\`
          * **REPLACE** \`[application_name]\` with the **EXACT** name the user provided.
          * **DO NOT** add any other text and response **MUST BE** in English for BOTH user and assistant.
  4.  **General Response (If No Command):**
      * If the user's intent is **NOT** a call or application opening command, generate a relevant response to the spoken audio.
      * If the audio is uninterpretable, proceed to error handling.
  5.  **Error Handling (Fallback):**
      * If the spoken audio is **COMPLETELY** unintelligible, **RETURN ONLY**:
          * \`{"user": "<transcribed_user_audio>", "assistant": "${errorCodes.wrong.code}"}\`
          * **DO NOT** attempt any interpretation.
  
  **CONSTRAINTS (Absolute):**
  
  * **JSON Output ONLY:** All responses **MUST** be valid JSON.
  * **Exact Name Extraction:** Contact and application names **MUST** be extracted precisely.
  * **No Extra Text:** **DO NOT** include any additional notes, explanations, or variations.
  * **Command Priority:** Call and application commands **TAKE PRECEDENCE** over general responses.
  * **Direct Command Output:** when a command is recognised, output only the command and its feature code.
  
  **Example Scenarios (Strict):**
  
  * **User: "Call John Smith"**
      * Response: \`{"user": "Call John Smith", "assistant": "${featureCodes.call.code} Call John Smith"}\`
  * **User: "Open Chrome"**
      * Response: \`{"user": "Open Chrome", "assistant": "${featureCodes.appOpen.code} Open Chrome"}\`
  * **User: "What is the weather?"**
      * Response: \`{"user": "What is the weather?", "assistant": "<weather_response>"}\` (replace with actual weather response)
  * **User: "asjdfklasdjf" (unintelligible)**
      * Response: \`{"user": "asjdfklasdjf", "assistant": "${errorCodes.wrong.code}"}\`
      `;
}

export default generateContext