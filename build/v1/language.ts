// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Cloud Natural Language API Client for Deno
 * ==========================================
 * 
 * Provides natural language understanding technologies, such as sentiment analysis, entity recognition, entity sentiment analysis, and other text annotations, to developers.
 * 
 * Docs: https://cloud.google.com/natural-language/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * Provides natural language understanding technologies, such as sentiment
 * analysis, entity recognition, entity sentiment analysis, and other text
 * annotations, to developers.
 */
export class Language {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://language.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Finds named entities (currently proper names and common nouns) in the text
   * along with entity types, salience, mentions for each entity, and other
   * properties.
   *
   */
  async documentsAnalyzeEntities(req: AnalyzeEntitiesRequest): Promise<AnalyzeEntitiesResponse> {
    const url = new URL(`${this.#baseUrl}v1/documents:analyzeEntities`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AnalyzeEntitiesResponse;
  }

  /**
   * Finds entities, similar to AnalyzeEntities in the text and analyzes
   * sentiment associated with each entity and its mentions.
   *
   */
  async documentsAnalyzeEntitySentiment(req: AnalyzeEntitySentimentRequest): Promise<AnalyzeEntitySentimentResponse> {
    const url = new URL(`${this.#baseUrl}v1/documents:analyzeEntitySentiment`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AnalyzeEntitySentimentResponse;
  }

  /**
   * Analyzes the sentiment of the provided text.
   *
   */
  async documentsAnalyzeSentiment(req: AnalyzeSentimentRequest): Promise<AnalyzeSentimentResponse> {
    const url = new URL(`${this.#baseUrl}v1/documents:analyzeSentiment`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AnalyzeSentimentResponse;
  }

  /**
   * Analyzes the syntax of the text and provides sentence boundaries and
   * tokenization along with part of speech tags, dependency trees, and other
   * properties.
   *
   */
  async documentsAnalyzeSyntax(req: AnalyzeSyntaxRequest): Promise<AnalyzeSyntaxResponse> {
    const url = new URL(`${this.#baseUrl}v1/documents:analyzeSyntax`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AnalyzeSyntaxResponse;
  }

  /**
   * A convenience method that provides all the features that analyzeSentiment,
   * analyzeEntities, and analyzeSyntax provide in one call.
   *
   */
  async documentsAnnotateText(req: AnnotateTextRequest): Promise<AnnotateTextResponse> {
    const url = new URL(`${this.#baseUrl}v1/documents:annotateText`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as AnnotateTextResponse;
  }

  /**
   * Classifies a document into categories.
   *
   */
  async documentsClassifyText(req: ClassifyTextRequest): Promise<ClassifyTextResponse> {
    const url = new URL(`${this.#baseUrl}v1/documents:classifyText`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return data as ClassifyTextResponse;
  }
}

/**
 * The entity analysis request message.
 */
export interface AnalyzeEntitiesRequest {
  /**
   * Required. Input document.
   */
  document?: Document;
  /**
   * The encoding type used by the API to calculate offsets.
   */
  encodingType?:  | "NONE" | "UTF8" | "UTF16" | "UTF32";
}

/**
 * The entity analysis response message.
 */
export interface AnalyzeEntitiesResponse {
  /**
   * The recognized entities in the input document.
   */
  entities?: Entity[];
  /**
   * The language of the text, which will be the same as the language specified
   * in the request or, if not specified, the automatically-detected language.
   * See Document.language field for more details.
   */
  language?: string;
}

/**
 * The entity-level sentiment analysis request message.
 */
export interface AnalyzeEntitySentimentRequest {
  /**
   * Required. Input document.
   */
  document?: Document;
  /**
   * The encoding type used by the API to calculate offsets.
   */
  encodingType?:  | "NONE" | "UTF8" | "UTF16" | "UTF32";
}

/**
 * The entity-level sentiment analysis response message.
 */
export interface AnalyzeEntitySentimentResponse {
  /**
   * The recognized entities in the input document with associated sentiments.
   */
  entities?: Entity[];
  /**
   * The language of the text, which will be the same as the language specified
   * in the request or, if not specified, the automatically-detected language.
   * See Document.language field for more details.
   */
  language?: string;
}

/**
 * The sentiment analysis request message.
 */
export interface AnalyzeSentimentRequest {
  /**
   * Required. Input document.
   */
  document?: Document;
  /**
   * The encoding type used by the API to calculate sentence offsets.
   */
  encodingType?:  | "NONE" | "UTF8" | "UTF16" | "UTF32";
}

/**
 * The sentiment analysis response message.
 */
export interface AnalyzeSentimentResponse {
  /**
   * The overall sentiment of the input document.
   */
  documentSentiment?: Sentiment;
  /**
   * The language of the text, which will be the same as the language specified
   * in the request or, if not specified, the automatically-detected language.
   * See Document.language field for more details.
   */
  language?: string;
  /**
   * The sentiment for all the sentences in the document.
   */
  sentences?: Sentence[];
}

/**
 * The syntax analysis request message.
 */
export interface AnalyzeSyntaxRequest {
  /**
   * Required. Input document.
   */
  document?: Document;
  /**
   * The encoding type used by the API to calculate offsets.
   */
  encodingType?:  | "NONE" | "UTF8" | "UTF16" | "UTF32";
}

/**
 * The syntax analysis response message.
 */
export interface AnalyzeSyntaxResponse {
  /**
   * The language of the text, which will be the same as the language specified
   * in the request or, if not specified, the automatically-detected language.
   * See Document.language field for more details.
   */
  language?: string;
  /**
   * Sentences in the input document.
   */
  sentences?: Sentence[];
  /**
   * Tokens, along with their syntactic information, in the input document.
   */
  tokens?: Token[];
}

/**
 * The request message for the text annotation API, which can perform multiple
 * analysis types (sentiment, entities, and syntax) in one call.
 */
export interface AnnotateTextRequest {
  /**
   * Required. Input document.
   */
  document?: Document;
  /**
   * The encoding type used by the API to calculate offsets.
   */
  encodingType?:  | "NONE" | "UTF8" | "UTF16" | "UTF32";
  /**
   * Required. The enabled features.
   */
  features?: Features;
}

/**
 * The text annotations response message.
 */
export interface AnnotateTextResponse {
  /**
   * Categories identified in the input document.
   */
  categories?: ClassificationCategory[];
  /**
   * The overall sentiment for the document. Populated if the user enables
   * AnnotateTextRequest.Features.extract_document_sentiment.
   */
  documentSentiment?: Sentiment;
  /**
   * Entities, along with their semantic information, in the input document.
   * Populated if the user enables
   * AnnotateTextRequest.Features.extract_entities.
   */
  entities?: Entity[];
  /**
   * The language of the text, which will be the same as the language specified
   * in the request or, if not specified, the automatically-detected language.
   * See Document.language field for more details.
   */
  language?: string;
  /**
   * Sentences in the input document. Populated if the user enables
   * AnnotateTextRequest.Features.extract_syntax.
   */
  sentences?: Sentence[];
  /**
   * Tokens, along with their syntactic information, in the input document.
   * Populated if the user enables AnnotateTextRequest.Features.extract_syntax.
   */
  tokens?: Token[];
}

/**
 * Represents a category returned from the text classifier.
 */
export interface ClassificationCategory {
  /**
   * The classifier's confidence of the category. Number represents how certain
   * the classifier is that this category represents the given text.
   */
  confidence?: number;
  /**
   * The name of the category representing the document, from the [predefined
   * taxonomy](https://cloud.google.com/natural-language/docs/categories).
   */
  name?: string;
}

/**
 * Model options available for classification requests.
 */
export interface ClassificationModelOptions {
  /**
   * Setting this field will use the V1 model and V1 content categories
   * version. The V1 model is a legacy model; support for this will be
   * discontinued in the future.
   */
  v1Model?: V1Model;
  /**
   * Setting this field will use the V2 model with the appropriate content
   * categories version. The V2 model is a better performing model.
   */
  v2Model?: V2Model;
}

/**
 * The document classification request message.
 */
export interface ClassifyTextRequest {
  /**
   * Model options to use for classification. Defaults to v1 options if not
   * specified.
   */
  classificationModelOptions?: ClassificationModelOptions;
  /**
   * Required. Input document.
   */
  document?: Document;
}

/**
 * The document classification response message.
 */
export interface ClassifyTextResponse {
  /**
   * Categories representing the input document.
   */
  categories?: ClassificationCategory[];
}

/**
 * Represents dependency parse tree information for a token. (For more
 * information on dependency labels, see
 * http://www.aclweb.org/anthology/P13-2017
 */
export interface DependencyEdge {
  /**
   * Represents the head of this token in the dependency tree. This is the
   * index of the token which has an arc going to this token. The index is the
   * position of the token in the array of tokens returned by the API method. If
   * this token is a root token, then the `head_token_index` is its own index.
   */
  headTokenIndex?: number;
  /**
   * The parse label for the token.
   */
  label?:  | "UNKNOWN" | "ABBREV" | "ACOMP" | "ADVCL" | "ADVMOD" | "AMOD" | "APPOS" | "ATTR" | "AUX" | "AUXPASS" | "CC" | "CCOMP" | "CONJ" | "CSUBJ" | "CSUBJPASS" | "DEP" | "DET" | "DISCOURSE" | "DOBJ" | "EXPL" | "GOESWITH" | "IOBJ" | "MARK" | "MWE" | "MWV" | "NEG" | "NN" | "NPADVMOD" | "NSUBJ" | "NSUBJPASS" | "NUM" | "NUMBER" | "P" | "PARATAXIS" | "PARTMOD" | "PCOMP" | "POBJ" | "POSS" | "POSTNEG" | "PRECOMP" | "PRECONJ" | "PREDET" | "PREF" | "PREP" | "PRONL" | "PRT" | "PS" | "QUANTMOD" | "RCMOD" | "RCMODREL" | "RDROP" | "REF" | "REMNANT" | "REPARANDUM" | "ROOT" | "SNUM" | "SUFF" | "TMOD" | "TOPIC" | "VMOD" | "VOCATIVE" | "XCOMP" | "SUFFIX" | "TITLE" | "ADVPHMOD" | "AUXCAUS" | "AUXVV" | "DTMOD" | "FOREIGN" | "KW" | "LIST" | "NOMC" | "NOMCSUBJ" | "NOMCSUBJPASS" | "NUMC" | "COP" | "DISLOCATED" | "ASP" | "GMOD" | "GOBJ" | "INFMOD" | "MES" | "NCOMP";
}

/**
 * Represents the input to API methods.
 */
export interface Document {
  /**
   * The content of the input in string format. Cloud audit logging exempt
   * since it is based on user data.
   */
  content?: string;
  /**
   * The Google Cloud Storage URI where the file content is located. This URI
   * must be of the form: gs://bucket_name/object_name. For more details, see
   * https://cloud.google.com/storage/docs/reference-uris. NOTE: Cloud Storage
   * object versioning is not supported.
   */
  gcsContentUri?: string;
  /**
   * The language of the document (if not specified, the language is
   * automatically detected). Both ISO and BCP-47 language codes are accepted.
   * [Language
   * Support](https://cloud.google.com/natural-language/docs/languages) lists
   * currently supported languages for each API method. If the language (either
   * specified by the caller or automatically detected) is not supported by the
   * called API method, an `INVALID_ARGUMENT` error is returned.
   */
  language?: string;
  /**
   * Required. If the type is not set or is `TYPE_UNSPECIFIED`, returns an
   * `INVALID_ARGUMENT` error.
   */
  type?:  | "TYPE_UNSPECIFIED" | "PLAIN_TEXT" | "HTML";
}

/**
 * Represents a phrase in the text that is a known entity, such as a person, an
 * organization, or location. The API associates information, such as salience
 * and mentions, with entities.
 */
export interface Entity {
  /**
   * The mentions of this entity in the input document. The API currently
   * supports proper noun mentions.
   */
  mentions?: EntityMention[];
  /**
   * Metadata associated with the entity. For most entity types, the metadata
   * is a Wikipedia URL (`wikipedia_url`) and Knowledge Graph MID (`mid`), if
   * they are available. For the metadata associated with other entity types,
   * see the Type table below.
   */
  metadata?: {
    [key: string]: string
  };
  /**
   * The representative name for the entity.
   */
  name?: string;
  /**
   * The salience score associated with the entity in the [0, 1.0] range. The
   * salience score for an entity provides information about the importance or
   * centrality of that entity to the entire document text. Scores closer to 0
   * are less salient, while scores closer to 1.0 are highly salient.
   */
  salience?: number;
  /**
   * For calls to AnalyzeEntitySentiment or if
   * AnnotateTextRequest.Features.extract_entity_sentiment is set to true, this
   * field will contain the aggregate sentiment expressed for this entity in the
   * provided document.
   */
  sentiment?: Sentiment;
  /**
   * The entity type.
   */
  type?:  | "UNKNOWN" | "PERSON" | "LOCATION" | "ORGANIZATION" | "EVENT" | "WORK_OF_ART" | "CONSUMER_GOOD" | "OTHER" | "PHONE_NUMBER" | "ADDRESS" | "DATE" | "NUMBER" | "PRICE";
}

/**
 * Represents a mention for an entity in the text. Currently, proper noun
 * mentions are supported.
 */
export interface EntityMention {
  /**
   * For calls to AnalyzeEntitySentiment or if
   * AnnotateTextRequest.Features.extract_entity_sentiment is set to true, this
   * field will contain the sentiment expressed for this mention of the entity
   * in the provided document.
   */
  sentiment?: Sentiment;
  /**
   * The mention text.
   */
  text?: TextSpan;
  /**
   * The type of the entity mention.
   */
  type?:  | "TYPE_UNKNOWN" | "PROPER" | "COMMON";
}

/**
 * All available features for sentiment, syntax, and semantic analysis. Setting
 * each one to true will enable that specific analysis for the input.
 */
export interface Features {
  /**
   * The model options to use for classification. Defaults to v1 options if not
   * specified. Only used if `classify_text` is set to true.
   */
  classificationModelOptions?: ClassificationModelOptions;
  /**
   * Classify the full document into categories.
   */
  classifyText?: boolean;
  /**
   * Extract document-level sentiment.
   */
  extractDocumentSentiment?: boolean;
  /**
   * Extract entities.
   */
  extractEntities?: boolean;
  /**
   * Extract entities and their associated sentiment.
   */
  extractEntitySentiment?: boolean;
  /**
   * Extract syntax information.
   */
  extractSyntax?: boolean;
}

/**
 * Represents part of speech information for a token. Parts of speech are as
 * defined in http://www.lrec-conf.org/proceedings/lrec2012/pdf/274_Paper.pdf
 */
export interface PartOfSpeech {
  /**
   * The grammatical aspect.
   */
  aspect?:  | "ASPECT_UNKNOWN" | "PERFECTIVE" | "IMPERFECTIVE" | "PROGRESSIVE";
  /**
   * The grammatical case.
   */
  case?:  | "CASE_UNKNOWN" | "ACCUSATIVE" | "ADVERBIAL" | "COMPLEMENTIVE" | "DATIVE" | "GENITIVE" | "INSTRUMENTAL" | "LOCATIVE" | "NOMINATIVE" | "OBLIQUE" | "PARTITIVE" | "PREPOSITIONAL" | "REFLEXIVE_CASE" | "RELATIVE_CASE" | "VOCATIVE";
  /**
   * The grammatical form.
   */
  form?:  | "FORM_UNKNOWN" | "ADNOMIAL" | "AUXILIARY" | "COMPLEMENTIZER" | "FINAL_ENDING" | "GERUND" | "REALIS" | "IRREALIS" | "SHORT" | "LONG" | "ORDER" | "SPECIFIC";
  /**
   * The grammatical gender.
   */
  gender?:  | "GENDER_UNKNOWN" | "FEMININE" | "MASCULINE" | "NEUTER";
  /**
   * The grammatical mood.
   */
  mood?:  | "MOOD_UNKNOWN" | "CONDITIONAL_MOOD" | "IMPERATIVE" | "INDICATIVE" | "INTERROGATIVE" | "JUSSIVE" | "SUBJUNCTIVE";
  /**
   * The grammatical number.
   */
  number?:  | "NUMBER_UNKNOWN" | "SINGULAR" | "PLURAL" | "DUAL";
  /**
   * The grammatical person.
   */
  person?:  | "PERSON_UNKNOWN" | "FIRST" | "SECOND" | "THIRD" | "REFLEXIVE_PERSON";
  /**
   * The grammatical properness.
   */
  proper?:  | "PROPER_UNKNOWN" | "PROPER" | "NOT_PROPER";
  /**
   * The grammatical reciprocity.
   */
  reciprocity?:  | "RECIPROCITY_UNKNOWN" | "RECIPROCAL" | "NON_RECIPROCAL";
  /**
   * The part of speech tag.
   */
  tag?:  | "UNKNOWN" | "ADJ" | "ADP" | "ADV" | "CONJ" | "DET" | "NOUN" | "NUM" | "PRON" | "PRT" | "PUNCT" | "VERB" | "X" | "AFFIX";
  /**
   * The grammatical tense.
   */
  tense?:  | "TENSE_UNKNOWN" | "CONDITIONAL_TENSE" | "FUTURE" | "PAST" | "PRESENT" | "IMPERFECT" | "PLUPERFECT";
  /**
   * The grammatical voice.
   */
  voice?:  | "VOICE_UNKNOWN" | "ACTIVE" | "CAUSATIVE" | "PASSIVE";
}

/**
 * Represents a sentence in the input document.
 */
export interface Sentence {
  /**
   * For calls to AnalyzeSentiment or if
   * AnnotateTextRequest.Features.extract_document_sentiment is set to true,
   * this field will contain the sentiment for the sentence.
   */
  sentiment?: Sentiment;
  /**
   * The sentence text.
   */
  text?: TextSpan;
}

/**
 * Represents the feeling associated with the entire text or entities in the
 * text.
 */
export interface Sentiment {
  /**
   * A non-negative number in the [0, +inf) range, which represents the
   * absolute magnitude of sentiment regardless of score (positive or negative).
   */
  magnitude?: number;
  /**
   * Sentiment score between -1.0 (negative sentiment) and 1.0 (positive
   * sentiment).
   */
  score?: number;
}

/**
 * The `Status` type defines a logical error model that is suitable for
 * different programming environments, including REST APIs and RPC APIs. It is
 * used by [gRPC](https://github.com/grpc). Each `Status` message contains three
 * pieces of data: error code, error message, and error details. You can find
 * out more about this error model and how to work with it in the [API Design
 * Guide](https://cloud.google.com/apis/design/errors).
 */
export interface Status {
  /**
   * The status code, which should be an enum value of google.rpc.Code.
   */
  code?: number;
  /**
   * A list of messages that carry the error details. There is a common set of
   * message types for APIs to use.
   */
  details?: {
    [key: string]: any
  }[];
  /**
   * A developer-facing error message, which should be in English. Any
   * user-facing error message should be localized and sent in the
   * google.rpc.Status.details field, or localized by the client.
   */
  message?: string;
}

/**
 * Represents an output piece of text.
 */
export interface TextSpan {
  /**
   * The API calculates the beginning offset of the content in the original
   * document according to the EncodingType specified in the API request.
   */
  beginOffset?: number;
  /**
   * The content of the output text.
   */
  content?: string;
}

/**
 * Represents the smallest syntactic building block of the text.
 */
export interface Token {
  /**
   * Dependency tree parse for this token.
   */
  dependencyEdge?: DependencyEdge;
  /**
   * [Lemma](https://en.wikipedia.org/wiki/Lemma_%28morphology%29) of the
   * token.
   */
  lemma?: string;
  /**
   * Parts of speech tag for this token.
   */
  partOfSpeech?: PartOfSpeech;
  /**
   * The token text.
   */
  text?: TextSpan;
}

/**
 * Options for the V1 model.
 */
export interface V1Model {
}

/**
 * Options for the V2 model.
 */
export interface V2Model {
  /**
   * The content categories used for classification.
   */
  contentCategoriesVersion?:  | "CONTENT_CATEGORIES_VERSION_UNSPECIFIED" | "V1" | "V2";
}