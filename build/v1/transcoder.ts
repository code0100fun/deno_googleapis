// Copyright 2022 Luca Casonato. All rights reserved. MIT license.
/**
 * Transcoder API Client for Deno
 * ==============================
 * 
 * This API converts video files into formats suitable for consumer distribution. For more information, see the Transcoder API overview. 
 * 
 * Docs: https://cloud.google.com/transcoder/docs/
 * Source: https://github.com/code0100fun/deno_googleapis
 */

import { auth, CredentialsClient, GoogleAuth, request } from "../../base/mod.ts";
export { auth, GoogleAuth };
export type { CredentialsClient };

/**
 * This API converts video files into formats suitable for consumer
 * distribution. For more information, see the Transcoder API overview.
 */
export class Transcoder {
  #client: CredentialsClient | undefined;
  #baseUrl: string;

  constructor(client?: CredentialsClient, baseUrl: string = "https://transcoder.googleapis.com/") {
    this.#client = client;
    this.#baseUrl = baseUrl;
  }

  /**
   * Creates a job in the specified region.
   *
   * @param parent Required. The parent location to create and process this job. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsJobsCreate(parent: string, req: Job): Promise<Job> {
    req = serializeJob(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJob(data);
  }

  /**
   * Deletes a job.
   *
   * @param name Required. The name of the job to delete. Format: `projects/{project}/locations/{location}/jobs/{job}`
   */
  async projectsLocationsJobsDelete(name: string, opts: ProjectsLocationsJobsDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the job data.
   *
   * @param name Required. The name of the job to retrieve. Format: `projects/{project}/locations/{location}/jobs/{job}`
   */
  async projectsLocationsJobsGet(name: string): Promise<Job> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJob(data);
  }

  /**
   * Lists jobs in the specified region.
   *
   * @param parent Required. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsJobsList(parent: string, opts: ProjectsLocationsJobsListOptions = {}): Promise<ListJobsResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobs`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListJobsResponse(data);
  }

  /**
   * Creates a job template in the specified region.
   *
   * @param parent Required. The parent location to create this job template. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsJobTemplatesCreate(parent: string, req: JobTemplate, opts: ProjectsLocationsJobTemplatesCreateOptions = {}): Promise<JobTemplate> {
    req = serializeJobTemplate(req);
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobTemplates`);
    if (opts.jobTemplateId !== undefined) {
      url.searchParams.append("jobTemplateId", String(opts.jobTemplateId));
    }
    const body = JSON.stringify(req);
    const data = await request(url.href, {
      client: this.#client,
      method: "POST",
      body,
    });
    return deserializeJobTemplate(data);
  }

  /**
   * Deletes a job template.
   *
   * @param name Required. The name of the job template to delete. `projects/{project}/locations/{location}/jobTemplates/{job_template}`
   */
  async projectsLocationsJobTemplatesDelete(name: string, opts: ProjectsLocationsJobTemplatesDeleteOptions = {}): Promise<Empty> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    if (opts.allowMissing !== undefined) {
      url.searchParams.append("allowMissing", String(opts.allowMissing));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "DELETE",
    });
    return data as Empty;
  }

  /**
   * Returns the job template data.
   *
   * @param name Required. The name of the job template to retrieve. Format: `projects/{project}/locations/{location}/jobTemplates/{job_template}`
   */
  async projectsLocationsJobTemplatesGet(name: string): Promise<JobTemplate> {
    const url = new URL(`${this.#baseUrl}v1/${ name }`);
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeJobTemplate(data);
  }

  /**
   * Lists job templates in the specified region.
   *
   * @param parent Required. The parent location from which to retrieve the collection of job templates. Format: `projects/{project}/locations/{location}`
   */
  async projectsLocationsJobTemplatesList(parent: string, opts: ProjectsLocationsJobTemplatesListOptions = {}): Promise<ListJobTemplatesResponse> {
    const url = new URL(`${this.#baseUrl}v1/${ parent }/jobTemplates`);
    if (opts.filter !== undefined) {
      url.searchParams.append("filter", String(opts.filter));
    }
    if (opts.orderBy !== undefined) {
      url.searchParams.append("orderBy", String(opts.orderBy));
    }
    if (opts.pageSize !== undefined) {
      url.searchParams.append("pageSize", String(opts.pageSize));
    }
    if (opts.pageToken !== undefined) {
      url.searchParams.append("pageToken", String(opts.pageToken));
    }
    const data = await request(url.href, {
      client: this.#client,
      method: "GET",
    });
    return deserializeListJobTemplatesResponse(data);
  }
}

/**
 * Ad break.
 */
export interface AdBreak {
  /**
   * Start time in seconds for the ad break, relative to the output file
   * timeline. The default is `0s`.
   */
  startTimeOffset?: number /* Duration */;
}

function serializeAdBreak(data: any): AdBreak {
  return {
    ...data,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeAdBreak(data: any): AdBreak {
  return {
    ...data,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Animation types.
 */
export interface Animation {
  /**
   * End previous animation.
   */
  animationEnd?: AnimationEnd;
  /**
   * Display overlay object with fade animation.
   */
  animationFade?: AnimationFade;
  /**
   * Display static overlay object.
   */
  animationStatic?: AnimationStatic;
}

function serializeAnimation(data: any): Animation {
  return {
    ...data,
    animationEnd: data["animationEnd"] !== undefined ? serializeAnimationEnd(data["animationEnd"]) : undefined,
    animationFade: data["animationFade"] !== undefined ? serializeAnimationFade(data["animationFade"]) : undefined,
    animationStatic: data["animationStatic"] !== undefined ? serializeAnimationStatic(data["animationStatic"]) : undefined,
  };
}

function deserializeAnimation(data: any): Animation {
  return {
    ...data,
    animationEnd: data["animationEnd"] !== undefined ? deserializeAnimationEnd(data["animationEnd"]) : undefined,
    animationFade: data["animationFade"] !== undefined ? deserializeAnimationFade(data["animationFade"]) : undefined,
    animationStatic: data["animationStatic"] !== undefined ? deserializeAnimationStatic(data["animationStatic"]) : undefined,
  };
}

/**
 * End previous overlay animation from the video. Without AnimationEnd, the
 * overlay object will keep the state of previous animation until the end of the
 * video.
 */
export interface AnimationEnd {
  /**
   * The time to end overlay object, in seconds. Default: 0
   */
  startTimeOffset?: number /* Duration */;
}

function serializeAnimationEnd(data: any): AnimationEnd {
  return {
    ...data,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeAnimationEnd(data: any): AnimationEnd {
  return {
    ...data,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Display overlay object with fade animation.
 */
export interface AnimationFade {
  /**
   * The time to end the fade animation, in seconds. Default:
   * `start_time_offset` + 1s
   */
  endTimeOffset?: number /* Duration */;
  /**
   * Required. Type of fade animation: `FADE_IN` or `FADE_OUT`.
   */
  fadeType?:  | "FADE_TYPE_UNSPECIFIED" | "FADE_IN" | "FADE_OUT";
  /**
   * The time to start the fade animation, in seconds. Default: 0
   */
  startTimeOffset?: number /* Duration */;
  /**
   * Normalized coordinates based on output video resolution. Valid values:
   * `0.0`–`1.0`. `xy` is the upper-left coordinate of the overlay object. For
   * example, use the x and y coordinates {0,0} to position the top-left corner
   * of the overlay animation in the top-left corner of the output video.
   */
  xy?: NormalizedCoordinate;
}

function serializeAnimationFade(data: any): AnimationFade {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeAnimationFade(data: any): AnimationFade {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Display static overlay object.
 */
export interface AnimationStatic {
  /**
   * The time to start displaying the overlay object, in seconds. Default: 0
   */
  startTimeOffset?: number /* Duration */;
  /**
   * Normalized coordinates based on output video resolution. Valid values:
   * `0.0`–`1.0`. `xy` is the upper-left coordinate of the overlay object. For
   * example, use the x and y coordinates {0,0} to position the top-left corner
   * of the overlay animation in the top-left corner of the output video.
   */
  xy?: NormalizedCoordinate;
}

function serializeAnimationStatic(data: any): AnimationStatic {
  return {
    ...data,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeAnimationStatic(data: any): AnimationStatic {
  return {
    ...data,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Audio preprocessing configuration.
 */
export interface Audio {
  /**
   * Enable boosting high frequency components. The default is `false`.
   * **Note:** This field is not supported.
   */
  highBoost?: boolean;
  /**
   * Enable boosting low frequency components. The default is `false`.
   * **Note:** This field is not supported.
   */
  lowBoost?: boolean;
  /**
   * Specify audio loudness normalization in loudness units relative to full
   * scale (LUFS). Enter a value between -24 and 0 (the default), where: * -24
   * is the Advanced Television Systems Committee (ATSC A/85) standard * -23 is
   * the EU R128 broadcast standard * -19 is the prior standard for online mono
   * audio * -18 is the ReplayGain standard * -16 is the prior standard for
   * stereo audio * -14 is the new online audio standard recommended by Spotify,
   * as well as Amazon Echo * 0 disables normalization
   */
  lufs?: number;
}

/**
 * The mapping for the `Job.edit_list` atoms with audio `EditAtom.inputs`.
 */
export interface AudioMapping {
  /**
   * Required. The `EditAtom.key` that references the atom with audio inputs in
   * the `Job.edit_list`.
   */
  atomKey?: string;
  /**
   * Audio volume control in dB. Negative values decrease volume, positive
   * values increase. The default is 0.
   */
  gainDb?: number;
  /**
   * Required. The zero-based index of the channel in the input audio stream.
   */
  inputChannel?: number;
  /**
   * Required. The `Input.key` that identifies the input file.
   */
  inputKey?: string;
  /**
   * Required. The zero-based index of the track in the input file.
   */
  inputTrack?: number;
  /**
   * Required. The zero-based index of the channel in the output audio stream.
   */
  outputChannel?: number;
}

/**
 * Audio stream resource.
 */
export interface AudioStream {
  /**
   * Required. Audio bitrate in bits per second. Must be between 1 and
   * 10,000,000.
   */
  bitrateBps?: number;
  /**
   * Number of audio channels. Must be between 1 and 6. The default is 2.
   */
  channelCount?: number;
  /**
   * A list of channel names specifying layout of the audio channels. This only
   * affects the metadata embedded in the container headers, if supported by the
   * specified format. The default is `["fl", "fr"]`. Supported channel names: -
   * `fl` - Front left channel - `fr` - Front right channel - `sl` - Side left
   * channel - `sr` - Side right channel - `fc` - Front center channel - `lfe` -
   * Low frequency
   */
  channelLayout?: string[];
  /**
   * The codec for this audio stream. The default is `aac`. Supported audio
   * codecs: - `aac` - `aac-he` - `aac-he-v2` - `mp3` - `ac3` - `eac3`
   */
  codec?: string;
  /**
   * The name for this particular audio stream that will be added to the
   * HLS/DASH manifest.
   */
  displayName?: string;
  /**
   * The BCP-47 language code, such as `en-US` or `sr-Latn`. For more
   * information, see
   * https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * The mapping for the `Job.edit_list` atoms with audio `EditAtom.inputs`.
   */
  mapping?: AudioMapping[];
  /**
   * The audio sample rate in Hertz. The default is 48000 Hertz.
   */
  sampleRateHertz?: number;
}

/**
 * Bob Weaver Deinterlacing Filter Configuration.
 */
export interface BwdifConfig {
  /**
   * Deinterlace all frames rather than just the frames identified as
   * interlaced. The default is `false`.
   */
  deinterlaceAllFrames?: boolean;
  /**
   * Specifies the deinterlacing mode to adopt. The default is `send_frame`.
   * Supported values: - `send_frame`: Output one frame for each frame -
   * `send_field`: Output one frame for each field
   */
  mode?: string;
  /**
   * The picture field parity assumed for the input interlaced video. The
   * default is `auto`. Supported values: - `tff`: Assume the top field is first
   * - `bff`: Assume the bottom field is first - `auto`: Enable automatic
   * detection of field parity
   */
  parity?: string;
}

/**
 * Color preprocessing configuration. **Note:** This configuration is not
 * supported.
 */
export interface Color {
  /**
   * Control brightness of the video. Enter a value between -1 and 1, where -1
   * is minimum brightness and 1 is maximum brightness. 0 is no change. The
   * default is 0.
   */
  brightness?: number;
  /**
   * Control black and white contrast of the video. Enter a value between -1
   * and 1, where -1 is minimum contrast and 1 is maximum contrast. 0 is no
   * change. The default is 0.
   */
  contrast?: number;
  /**
   * Control color saturation of the video. Enter a value between -1 and 1,
   * where -1 is fully desaturated and 1 is maximum saturation. 0 is no change.
   * The default is 0.
   */
  saturation?: number;
}

/**
 * Video cropping configuration for the input video. The cropped input video is
 * scaled to match the output resolution.
 */
export interface Crop {
  /**
   * The number of pixels to crop from the bottom. The default is 0.
   */
  bottomPixels?: number;
  /**
   * The number of pixels to crop from the left. The default is 0.
   */
  leftPixels?: number;
  /**
   * The number of pixels to crop from the right. The default is 0.
   */
  rightPixels?: number;
  /**
   * The number of pixels to crop from the top. The default is 0.
   */
  topPixels?: number;
}

/**
 * Deblock preprocessing configuration. **Note:** This configuration is not
 * supported.
 */
export interface Deblock {
  /**
   * Enable deblocker. The default is `false`.
   */
  enabled?: boolean;
  /**
   * Set strength of the deblocker. Enter a value between 0 and 1. The higher
   * the value, the stronger the block removal. 0 is no deblocking. The default
   * is 0.
   */
  strength?: number;
}

/**
 * Deinterlace configuration for input video.
 */
export interface Deinterlace {
  /**
   * Specifies the Bob Weaver Deinterlacing Filter Configuration.
   */
  bwdif?: BwdifConfig;
  /**
   * Specifies the Yet Another Deinterlacing Filter Configuration.
   */
  yadif?: YadifConfig;
}

/**
 * Denoise preprocessing configuration. **Note:** This configuration is not
 * supported.
 */
export interface Denoise {
  /**
   * Set strength of the denoise. Enter a value between 0 and 1. The higher the
   * value, the smoother the image. 0 is no denoising. The default is 0.
   */
  strength?: number;
  /**
   * Set the denoiser mode. The default is `standard`. Supported denoiser
   * modes: - `standard` - `grain`
   */
  tune?: string;
}

/**
 * Edit atom.
 */
export interface EditAtom {
  /**
   * End time in seconds for the atom, relative to the input file timeline.
   * When `end_time_offset` is not specified, the `inputs` are used until the
   * end of the atom.
   */
  endTimeOffset?: number /* Duration */;
  /**
   * List of `Input.key`s identifying files that should be used in this atom.
   * The listed `inputs` must have the same timeline.
   */
  inputs?: string[];
  /**
   * A unique key for this atom. Must be specified when using advanced mapping.
   */
  key?: string;
  /**
   * Start time in seconds for the atom, relative to the input file timeline.
   * The default is `0s`.
   */
  startTimeOffset?: number /* Duration */;
}

function serializeEditAtom(data: any): EditAtom {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeEditAtom(data: any): EditAtom {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

/**
 * Encoding of an input file such as an audio, video, or text track. Elementary
 * streams must be packaged before mapping and sharing between different output
 * formats.
 */
export interface ElementaryStream {
  /**
   * Encoding of an audio stream.
   */
  audioStream?: AudioStream;
  /**
   * A unique key for this elementary stream.
   */
  key?: string;
  /**
   * Encoding of a text stream. For example, closed captions or subtitles.
   */
  textStream?: TextStream;
  /**
   * Encoding of a video stream.
   */
  videoStream?: VideoStream;
}

function serializeElementaryStream(data: any): ElementaryStream {
  return {
    ...data,
    videoStream: data["videoStream"] !== undefined ? serializeVideoStream(data["videoStream"]) : undefined,
  };
}

function deserializeElementaryStream(data: any): ElementaryStream {
  return {
    ...data,
    videoStream: data["videoStream"] !== undefined ? deserializeVideoStream(data["videoStream"]) : undefined,
  };
}

/**
 * A generic empty message that you can re-use to avoid defining duplicated
 * empty messages in your APIs. A typical example is to use it as the request or
 * the response type of an API method. For instance: service Foo { rpc
 * Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
 */
export interface Empty {
}

/**
 * H264 codec settings.
 */
export interface H264CodecSettings {
  /**
   * Specifies whether an open Group of Pictures (GOP) structure should be
   * allowed or not. The default is `false`.
   */
  allowOpenGop?: boolean;
  /**
   * Specify the intensity of the adaptive quantizer (AQ). Must be between 0
   * and 1, where 0 disables the quantizer and 1 maximizes the quantizer. A
   * higher value equals a lower bitrate but smoother image. The default is 0.
   */
  aqStrength?: number;
  /**
   * The number of consecutive B-frames. Must be greater than or equal to zero.
   * Must be less than `VideoStream.gop_frame_count` if set. The default is 0.
   */
  bFrameCount?: number;
  /**
   * Required. The video bitrate in bits per second. The minimum value is
   * 1,000. The maximum value is 800,000,000.
   */
  bitrateBps?: number;
  /**
   * Allow B-pyramid for reference frame selection. This may not be supported
   * on all decoders. The default is `false`.
   */
  bPyramid?: boolean;
  /**
   * Target CRF level. Must be between 10 and 36, where 10 is the highest
   * quality and 36 is the most efficient compression. The default is 21.
   */
  crfLevel?: number;
  /**
   * Use two-pass encoding strategy to achieve better video quality.
   * `VideoStream.rate_control_mode` must be `vbr`. The default is `false`.
   */
  enableTwoPass?: boolean;
  /**
   * The entropy coder to use. The default is `cabac`. Supported entropy
   * coders: - `cavlc` - `cabac`
   */
  entropyCoder?: string;
  /**
   * Required. The target video frame rate in frames per second (FPS). Must be
   * less than or equal to 120. Will default to the input frame rate if larger
   * than the input frame rate. The API will generate an output FPS that is
   * divisible by the input FPS, and smaller or equal to the target FPS. See
   * [Calculating frame
   * rate](https://cloud.google.com/transcoder/docs/concepts/frame-rate) for
   * more information.
   */
  frameRate?: number;
  /**
   * Select the GOP size based on the specified duration. The default is `3s`.
   * Note that `gopDuration` must be less than or equal to
   * [`segmentDuration`](#SegmentSettings), and
   * [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.
   */
  gopDuration?: number /* Duration */;
  /**
   * Select the GOP size based on the specified frame count. Must be greater
   * than zero.
   */
  gopFrameCount?: number;
  /**
   * The height of the video in pixels. Must be an even integer. When not
   * specified, the height is adjusted to match the specified width and input
   * aspect ratio. If both are omitted, the input height is used. For portrait
   * videos that contain horizontal ASR and rotation metadata, provide the
   * height, in pixels, per the horizontal ASR. The API calculates the width per
   * the horizontal ASR. The API detects any rotation metadata and swaps the
   * requested height and width for the output.
   */
  heightPixels?: number;
  /**
   * Pixel format to use. The default is `yuv420p`. Supported pixel formats: -
   * `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format -
   * `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format -
   * `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format -
   * `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format
   */
  pixelFormat?: string;
  /**
   * Enforces the specified codec preset. The default is `veryfast`. The
   * available options are
   * [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Preset). Note
   * that certain values for this field may cause the transcoder to override
   * other fields you set in the `H264CodecSettings` message.
   */
  preset?: string;
  /**
   * Enforces the specified codec profile. The following profiles are
   * supported: * `baseline` * `main` * `high` (default) The available options
   * are [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Tune).
   * Note that certain values for this field may cause the transcoder to
   * override other fields you set in the `H264CodecSettings` message.
   */
  profile?: string;
  /**
   * Specify the `rate_control_mode`. The default is `vbr`. Supported rate
   * control modes: - `vbr` - variable bitrate - `crf` - constant rate factor
   */
  rateControlMode?: string;
  /**
   * Enforces the specified codec tune. The available options are
   * [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.264#Tune). Note
   * that certain values for this field may cause the transcoder to override
   * other fields you set in the `H264CodecSettings` message.
   */
  tune?: string;
  /**
   * Initial fullness of the Video Buffering Verifier (VBV) buffer in bits.
   * Must be greater than zero. The default is equal to 90% of
   * `VideoStream.vbv_size_bits`.
   */
  vbvFullnessBits?: number;
  /**
   * Size of the Video Buffering Verifier (VBV) buffer in bits. Must be greater
   * than zero. The default is equal to `VideoStream.bitrate_bps`.
   */
  vbvSizeBits?: number;
  /**
   * The width of the video in pixels. Must be an even integer. When not
   * specified, the width is adjusted to match the specified height and input
   * aspect ratio. If both are omitted, the input width is used. For portrait
   * videos that contain horizontal ASR and rotation metadata, provide the
   * width, in pixels, per the horizontal ASR. The API calculates the height per
   * the horizontal ASR. The API detects any rotation metadata and swaps the
   * requested height and width for the output.
   */
  widthPixels?: number;
}

function serializeH264CodecSettings(data: any): H264CodecSettings {
  return {
    ...data,
    gopDuration: data["gopDuration"] !== undefined ? data["gopDuration"] : undefined,
  };
}

function deserializeH264CodecSettings(data: any): H264CodecSettings {
  return {
    ...data,
    gopDuration: data["gopDuration"] !== undefined ? data["gopDuration"] : undefined,
  };
}

/**
 * H265 codec settings.
 */
export interface H265CodecSettings {
  /**
   * Specifies whether an open Group of Pictures (GOP) structure should be
   * allowed or not. The default is `false`.
   */
  allowOpenGop?: boolean;
  /**
   * Specify the intensity of the adaptive quantizer (AQ). Must be between 0
   * and 1, where 0 disables the quantizer and 1 maximizes the quantizer. A
   * higher value equals a lower bitrate but smoother image. The default is 0.
   */
  aqStrength?: number;
  /**
   * The number of consecutive B-frames. Must be greater than or equal to zero.
   * Must be less than `VideoStream.gop_frame_count` if set. The default is 0.
   */
  bFrameCount?: number;
  /**
   * Required. The video bitrate in bits per second. The minimum value is
   * 1,000. The maximum value is 800,000,000.
   */
  bitrateBps?: number;
  /**
   * Allow B-pyramid for reference frame selection. This may not be supported
   * on all decoders. The default is `false`.
   */
  bPyramid?: boolean;
  /**
   * Target CRF level. Must be between 10 and 36, where 10 is the highest
   * quality and 36 is the most efficient compression. The default is 21.
   */
  crfLevel?: number;
  /**
   * Use two-pass encoding strategy to achieve better video quality.
   * `VideoStream.rate_control_mode` must be `vbr`. The default is `false`.
   */
  enableTwoPass?: boolean;
  /**
   * Required. The target video frame rate in frames per second (FPS). Must be
   * less than or equal to 120. Will default to the input frame rate if larger
   * than the input frame rate. The API will generate an output FPS that is
   * divisible by the input FPS, and smaller or equal to the target FPS. See
   * [Calculating frame
   * rate](https://cloud.google.com/transcoder/docs/concepts/frame-rate) for
   * more information.
   */
  frameRate?: number;
  /**
   * Select the GOP size based on the specified duration. The default is `3s`.
   * Note that `gopDuration` must be less than or equal to
   * [`segmentDuration`](#SegmentSettings), and
   * [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.
   */
  gopDuration?: number /* Duration */;
  /**
   * Select the GOP size based on the specified frame count. Must be greater
   * than zero.
   */
  gopFrameCount?: number;
  /**
   * The height of the video in pixels. Must be an even integer. When not
   * specified, the height is adjusted to match the specified width and input
   * aspect ratio. If both are omitted, the input height is used. For portrait
   * videos that contain horizontal ASR and rotation metadata, provide the
   * height, in pixels, per the horizontal ASR. The API calculates the width per
   * the horizontal ASR. The API detects any rotation metadata and swaps the
   * requested height and width for the output.
   */
  heightPixels?: number;
  /**
   * Pixel format to use. The default is `yuv420p`. Supported pixel formats: -
   * `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format -
   * `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format -
   * `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format -
   * `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format
   */
  pixelFormat?: string;
  /**
   * Enforces the specified codec preset. The default is `veryfast`. The
   * available options are
   * [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.265). Note that
   * certain values for this field may cause the transcoder to override other
   * fields you set in the `H265CodecSettings` message.
   */
  preset?: string;
  /**
   * Enforces the specified codec profile. The following profiles are
   * supported: * 8-bit profiles * `main` (default) * `main-intra` *
   * `mainstillpicture` * 10-bit profiles * `main10` (default) * `main10-intra`
   * * `main422-10` * `main422-10-intra` * `main444-10` * `main444-10-intra` *
   * 12-bit profiles * `main12` (default) * `main12-intra` * `main422-12` *
   * `main422-12-intra` * `main444-12` * `main444-12-intra` The available
   * options are [FFmpeg-compatible](https://x265.readthedocs.io/). Note that
   * certain values for this field may cause the transcoder to override other
   * fields you set in the `H265CodecSettings` message.
   */
  profile?: string;
  /**
   * Specify the `rate_control_mode`. The default is `vbr`. Supported rate
   * control modes: - `vbr` - variable bitrate - `crf` - constant rate factor
   */
  rateControlMode?: string;
  /**
   * Enforces the specified codec tune. The available options are
   * [FFmpeg-compatible](https://trac.ffmpeg.org/wiki/Encode/H.265). Note that
   * certain values for this field may cause the transcoder to override other
   * fields you set in the `H265CodecSettings` message.
   */
  tune?: string;
  /**
   * Initial fullness of the Video Buffering Verifier (VBV) buffer in bits.
   * Must be greater than zero. The default is equal to 90% of
   * `VideoStream.vbv_size_bits`.
   */
  vbvFullnessBits?: number;
  /**
   * Size of the Video Buffering Verifier (VBV) buffer in bits. Must be greater
   * than zero. The default is equal to `VideoStream.bitrate_bps`.
   */
  vbvSizeBits?: number;
  /**
   * The width of the video in pixels. Must be an even integer. When not
   * specified, the width is adjusted to match the specified height and input
   * aspect ratio. If both are omitted, the input width is used. For portrait
   * videos that contain horizontal ASR and rotation metadata, provide the
   * width, in pixels, per the horizontal ASR. The API calculates the height per
   * the horizontal ASR. The API detects any rotation metadata and swaps the
   * requested height and width for the output.
   */
  widthPixels?: number;
}

function serializeH265CodecSettings(data: any): H265CodecSettings {
  return {
    ...data,
    gopDuration: data["gopDuration"] !== undefined ? data["gopDuration"] : undefined,
  };
}

function deserializeH265CodecSettings(data: any): H265CodecSettings {
  return {
    ...data,
    gopDuration: data["gopDuration"] !== undefined ? data["gopDuration"] : undefined,
  };
}

/**
 * Overlaid jpeg image.
 */
export interface Image {
  /**
   * Target image opacity. Valid values are from `1.0` (solid, default) to
   * `0.0` (transparent), exclusive. Set this to a value greater than `0.0`.
   */
  alpha?: number;
  /**
   * Normalized image resolution, based on output video resolution. Valid
   * values: `0.0`–`1.0`. To respect the original image aspect ratio, set either
   * `x` or `y` to `0.0`. To use the original image resolution, set both `x` and
   * `y` to `0.0`.
   */
  resolution?: NormalizedCoordinate;
  /**
   * Required. URI of the JPEG image in Cloud Storage. For example,
   * `gs://bucket/inputs/image.jpeg`. JPEG is the only supported image type.
   */
  uri?: string;
}

/**
 * Input asset.
 */
export interface Input {
  /**
   * A unique key for this input. Must be specified when using advanced mapping
   * and edit lists.
   */
  key?: string;
  /**
   * Preprocessing configurations.
   */
  preprocessingConfig?: PreprocessingConfig;
  /**
   * URI of the media. Input files must be at least 5 seconds in duration and
   * stored in Cloud Storage (for example, `gs://bucket/inputs/file.mp4`). If
   * empty, the value is populated from `Job.input_uri`. See [Supported input
   * and output
   * formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats).
   */
  uri?: string;
}

/**
 * Transcoding job resource.
 */
export interface Job {
  /**
   * The configuration for this job.
   */
  config?: JobConfig;
  /**
   * Output only. The time the job was created.
   */
  readonly createTime?: Date;
  /**
   * Output only. The time the transcoding finished.
   */
  readonly endTime?: Date;
  /**
   * Output only. An error object that describes the reason for the failure.
   * This property is always present when `state` is `FAILED`.
   */
  readonly error?: Status;
  /**
   * Input only. Specify the `input_uri` to populate empty `uri` fields in each
   * element of `Job.config.inputs` or `JobTemplate.config.inputs` when using
   * template. URI of the media. Input files must be at least 5 seconds in
   * duration and stored in Cloud Storage (for example,
   * `gs://bucket/inputs/file.mp4`). See [Supported input and output
   * formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats).
   */
  inputUri?: string;
  /**
   * The labels associated with this job. You can use these to organize and
   * group your jobs.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The resource name of the job. Format:
   * `projects/{project_number}/locations/{location}/jobs/{job}`
   */
  name?: string;
  /**
   * Input only. Specify the `output_uri` to populate an empty
   * `Job.config.output.uri` or `JobTemplate.config.output.uri` when using
   * template. URI for the output file(s). For example,
   * `gs://my-bucket/outputs/`. See [Supported input and output
   * formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats).
   */
  outputUri?: string;
  /**
   * Output only. The time the transcoding started.
   */
  readonly startTime?: Date;
  /**
   * Output only. The current state of the job.
   */
  readonly state?:  | "PROCESSING_STATE_UNSPECIFIED" | "PENDING" | "RUNNING" | "SUCCEEDED" | "FAILED";
  /**
   * Input only. Specify the `template_id` to use for populating `Job.config`.
   * The default is `preset/web-hd`. Preset Transcoder templates: -
   * `preset/{preset_id}` - User defined JobTemplate: `{job_template_id}`
   */
  templateId?: string;
  /**
   * Job time to live value in days, which will be effective after job
   * completion. Job should be deleted automatically after the given TTL. Enter
   * a value between 1 and 90. The default is 30.
   */
  ttlAfterCompletionDays?: number;
}

function serializeJob(data: any): Job {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeJobConfig(data["config"]) : undefined,
  };
}

function deserializeJob(data: any): Job {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeJobConfig(data["config"]) : undefined,
    createTime: data["createTime"] !== undefined ? new Date(data["createTime"]) : undefined,
    endTime: data["endTime"] !== undefined ? new Date(data["endTime"]) : undefined,
    startTime: data["startTime"] !== undefined ? new Date(data["startTime"]) : undefined,
  };
}

/**
 * Job configuration
 */
export interface JobConfig {
  /**
   * List of ad breaks. Specifies where to insert ad break tags in the output
   * manifests.
   */
  adBreaks?: AdBreak[];
  /**
   * List of `Edit atom`s. Defines the ultimate timeline of the resulting file
   * or manifest.
   */
  editList?: EditAtom[];
  /**
   * List of elementary streams.
   */
  elementaryStreams?: ElementaryStream[];
  /**
   * List of input assets stored in Cloud Storage.
   */
  inputs?: Input[];
  /**
   * List of output manifests.
   */
  manifests?: Manifest[];
  /**
   * List of multiplexing settings for output streams.
   */
  muxStreams?: MuxStream[];
  /**
   * Output configuration.
   */
  output?: Output;
  /**
   * List of overlays on the output video, in descending Z-order.
   */
  overlays?: Overlay[];
  /**
   * Destination on Pub/Sub.
   */
  pubsubDestination?: PubsubDestination;
  /**
   * List of output sprite sheets. Spritesheets require at least one
   * VideoStream in the Jobconfig.
   */
  spriteSheets?: SpriteSheet[];
}

function serializeJobConfig(data: any): JobConfig {
  return {
    ...data,
    adBreaks: data["adBreaks"] !== undefined ? data["adBreaks"].map((item: any) => (serializeAdBreak(item))) : undefined,
    editList: data["editList"] !== undefined ? data["editList"].map((item: any) => (serializeEditAtom(item))) : undefined,
    elementaryStreams: data["elementaryStreams"] !== undefined ? data["elementaryStreams"].map((item: any) => (serializeElementaryStream(item))) : undefined,
    muxStreams: data["muxStreams"] !== undefined ? data["muxStreams"].map((item: any) => (serializeMuxStream(item))) : undefined,
    overlays: data["overlays"] !== undefined ? data["overlays"].map((item: any) => (serializeOverlay(item))) : undefined,
    spriteSheets: data["spriteSheets"] !== undefined ? data["spriteSheets"].map((item: any) => (serializeSpriteSheet(item))) : undefined,
  };
}

function deserializeJobConfig(data: any): JobConfig {
  return {
    ...data,
    adBreaks: data["adBreaks"] !== undefined ? data["adBreaks"].map((item: any) => (deserializeAdBreak(item))) : undefined,
    editList: data["editList"] !== undefined ? data["editList"].map((item: any) => (deserializeEditAtom(item))) : undefined,
    elementaryStreams: data["elementaryStreams"] !== undefined ? data["elementaryStreams"].map((item: any) => (deserializeElementaryStream(item))) : undefined,
    muxStreams: data["muxStreams"] !== undefined ? data["muxStreams"].map((item: any) => (deserializeMuxStream(item))) : undefined,
    overlays: data["overlays"] !== undefined ? data["overlays"].map((item: any) => (deserializeOverlay(item))) : undefined,
    spriteSheets: data["spriteSheets"] !== undefined ? data["spriteSheets"].map((item: any) => (deserializeSpriteSheet(item))) : undefined,
  };
}

/**
 * Transcoding job template resource.
 */
export interface JobTemplate {
  /**
   * The configuration for this template.
   */
  config?: JobConfig;
  /**
   * The labels associated with this job template. You can use these to
   * organize and group your job templates.
   */
  labels?: {
    [key: string]: string
  };
  /**
   * The resource name of the job template. Format:
   * `projects/{project_number}/locations/{location}/jobTemplates/{job_template}`
   */
  name?: string;
}

function serializeJobTemplate(data: any): JobTemplate {
  return {
    ...data,
    config: data["config"] !== undefined ? serializeJobConfig(data["config"]) : undefined,
  };
}

function deserializeJobTemplate(data: any): JobTemplate {
  return {
    ...data,
    config: data["config"] !== undefined ? deserializeJobConfig(data["config"]) : undefined,
  };
}

/**
 * Response message for `TranscoderService.ListJobs`.
 */
export interface ListJobsResponse {
  /**
   * List of jobs in the specified region.
   */
  jobs?: Job[];
  /**
   * The pagination token.
   */
  nextPageToken?: string;
  /**
   * List of regions that could not be reached.
   */
  unreachable?: string[];
}

function serializeListJobsResponse(data: any): ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (serializeJob(item))) : undefined,
  };
}

function deserializeListJobsResponse(data: any): ListJobsResponse {
  return {
    ...data,
    jobs: data["jobs"] !== undefined ? data["jobs"].map((item: any) => (deserializeJob(item))) : undefined,
  };
}

/**
 * Response message for `TranscoderService.ListJobTemplates`.
 */
export interface ListJobTemplatesResponse {
  /**
   * List of job templates in the specified region.
   */
  jobTemplates?: JobTemplate[];
  /**
   * The pagination token.
   */
  nextPageToken?: string;
  /**
   * List of regions that could not be reached.
   */
  unreachable?: string[];
}

function serializeListJobTemplatesResponse(data: any): ListJobTemplatesResponse {
  return {
    ...data,
    jobTemplates: data["jobTemplates"] !== undefined ? data["jobTemplates"].map((item: any) => (serializeJobTemplate(item))) : undefined,
  };
}

function deserializeListJobTemplatesResponse(data: any): ListJobTemplatesResponse {
  return {
    ...data,
    jobTemplates: data["jobTemplates"] !== undefined ? data["jobTemplates"].map((item: any) => (deserializeJobTemplate(item))) : undefined,
  };
}

/**
 * Manifest configuration.
 */
export interface Manifest {
  /**
   * The name of the generated file. The default is `manifest` with the
   * extension suffix corresponding to the `Manifest.type`.
   */
  fileName?: string;
  /**
   * Required. List of user given `MuxStream.key`s that should appear in this
   * manifest. When `Manifest.type` is `HLS`, a media manifest with name
   * `MuxStream.key` and `.m3u8` extension is generated for each element of the
   * `Manifest.mux_streams`.
   */
  muxStreams?: string[];
  /**
   * Required. Type of the manifest, can be `HLS` or `DASH`.
   */
  type?:  | "MANIFEST_TYPE_UNSPECIFIED" | "HLS" | "DASH";
}

/**
 * Multiplexing settings for output stream.
 */
export interface MuxStream {
  /**
   * The container format. The default is `mp4` Supported container formats: -
   * `ts` - `fmp4`- the corresponding file extension is `.m4s` - `mp4` - `vtt`
   * See also: [Supported input and output
   * formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats)
   */
  container?: string;
  /**
   * List of `ElementaryStream.key`s multiplexed in this stream.
   */
  elementaryStreams?: string[];
  /**
   * The name of the generated file. The default is `MuxStream.key` with the
   * extension suffix corresponding to the `MuxStream.container`. Individual
   * segments also have an incremental 10-digit zero-padded suffix starting from
   * 0 before the extension, such as `mux_stream0000000123.ts`.
   */
  fileName?: string;
  /**
   * A unique key for this multiplexed stream. HLS media manifests will be
   * named `MuxStream.key` with the `.m3u8` extension suffix.
   */
  key?: string;
  /**
   * Segment settings for `ts`, `fmp4` and `vtt`.
   */
  segmentSettings?: SegmentSettings;
}

function serializeMuxStream(data: any): MuxStream {
  return {
    ...data,
    segmentSettings: data["segmentSettings"] !== undefined ? serializeSegmentSettings(data["segmentSettings"]) : undefined,
  };
}

function deserializeMuxStream(data: any): MuxStream {
  return {
    ...data,
    segmentSettings: data["segmentSettings"] !== undefined ? deserializeSegmentSettings(data["segmentSettings"]) : undefined,
  };
}

/**
 * 2D normalized coordinates. Default: `{0.0, 0.0}`
 */
export interface NormalizedCoordinate {
  /**
   * Normalized x coordinate.
   */
  x?: number;
  /**
   * Normalized y coordinate.
   */
  y?: number;
}

/**
 * Location of output file(s) in a Cloud Storage bucket.
 */
export interface Output {
  /**
   * URI for the output file(s). For example, `gs://my-bucket/outputs/`. If
   * empty, the value is populated from `Job.output_uri`. See [Supported input
   * and output
   * formats](https://cloud.google.com/transcoder/docs/concepts/supported-input-and-output-formats).
   */
  uri?: string;
}

/**
 * Overlay configuration.
 */
export interface Overlay {
  /**
   * List of Animations. The list should be chronological, without any time
   * overlap.
   */
  animations?: Animation[];
  /**
   * Image overlay.
   */
  image?: Image;
}

function serializeOverlay(data: any): Overlay {
  return {
    ...data,
    animations: data["animations"] !== undefined ? data["animations"].map((item: any) => (serializeAnimation(item))) : undefined,
  };
}

function deserializeOverlay(data: any): Overlay {
  return {
    ...data,
    animations: data["animations"] !== undefined ? data["animations"].map((item: any) => (deserializeAnimation(item))) : undefined,
  };
}

/**
 * Pad filter configuration for the input video. The padded input video is
 * scaled after padding with black to match the output resolution.
 */
export interface Pad {
  /**
   * The number of pixels to add to the bottom. The default is 0.
   */
  bottomPixels?: number;
  /**
   * The number of pixels to add to the left. The default is 0.
   */
  leftPixels?: number;
  /**
   * The number of pixels to add to the right. The default is 0.
   */
  rightPixels?: number;
  /**
   * The number of pixels to add to the top. The default is 0.
   */
  topPixels?: number;
}

/**
 * Preprocessing configurations.
 */
export interface PreprocessingConfig {
  /**
   * Audio preprocessing configuration.
   */
  audio?: Audio;
  /**
   * Color preprocessing configuration.
   */
  color?: Color;
  /**
   * Specify the video cropping configuration.
   */
  crop?: Crop;
  /**
   * Deblock preprocessing configuration.
   */
  deblock?: Deblock;
  /**
   * Specify the video deinterlace configuration.
   */
  deinterlace?: Deinterlace;
  /**
   * Denoise preprocessing configuration.
   */
  denoise?: Denoise;
  /**
   * Specify the video pad filter configuration.
   */
  pad?: Pad;
}

/**
 * Additional options for Transcoder#projectsLocationsJobsDelete.
 */
export interface ProjectsLocationsJobsDeleteOptions {
  /**
   * If set to true, and the job is not found, the request will succeed but no
   * action will be taken on the server.
   */
  allowMissing?: boolean;
}

/**
 * Additional options for Transcoder#projectsLocationsJobsList.
 */
export interface ProjectsLocationsJobsListOptions {
  /**
   * The filter expression, following the syntax outlined in
   * https://google.aip.dev/160.
   */
  filter?: string;
  /**
   * One or more fields to compare and use to sort the output. See
   * https://google.aip.dev/132#ordering.
   */
  orderBy?: string;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * Additional options for Transcoder#projectsLocationsJobTemplatesCreate.
 */
export interface ProjectsLocationsJobTemplatesCreateOptions {
  /**
   * Required. The ID to use for the job template, which will become the final
   * component of the job template's resource name. This value should be 4-63
   * characters, and valid characters must match the regular expression
   * `a-zA-Z*`.
   */
  jobTemplateId?: string;
}

/**
 * Additional options for Transcoder#projectsLocationsJobTemplatesDelete.
 */
export interface ProjectsLocationsJobTemplatesDeleteOptions {
  /**
   * If set to true, and the job template is not found, the request will
   * succeed but no action will be taken on the server.
   */
  allowMissing?: boolean;
}

/**
 * Additional options for Transcoder#projectsLocationsJobTemplatesList.
 */
export interface ProjectsLocationsJobTemplatesListOptions {
  /**
   * The filter expression, following the syntax outlined in
   * https://google.aip.dev/160.
   */
  filter?: string;
  /**
   * One or more fields to compare and use to sort the output. See
   * https://google.aip.dev/132#ordering.
   */
  orderBy?: string;
  /**
   * The maximum number of items to return.
   */
  pageSize?: number;
  /**
   * The `next_page_token` value returned from a previous List request, if any.
   */
  pageToken?: string;
}

/**
 * A Pub/Sub destination.
 */
export interface PubsubDestination {
  /**
   * The name of the Pub/Sub topic to publish job completion notification to.
   * For example: `projects/{project}/topics/{topic}`.
   */
  topic?: string;
}

/**
 * Segment settings for `ts`, `fmp4` and `vtt`.
 */
export interface SegmentSettings {
  /**
   * Required. Create an individual segment file. The default is `false`.
   */
  individualSegments?: boolean;
  /**
   * Duration of the segments in seconds. The default is `6.0s`. Note that
   * `segmentDuration` must be greater than or equal to
   * [`gopDuration`](#videostream), and `segmentDuration` must be divisible by
   * [`gopDuration`](#videostream).
   */
  segmentDuration?: number /* Duration */;
}

function serializeSegmentSettings(data: any): SegmentSettings {
  return {
    ...data,
    segmentDuration: data["segmentDuration"] !== undefined ? data["segmentDuration"] : undefined,
  };
}

function deserializeSegmentSettings(data: any): SegmentSettings {
  return {
    ...data,
    segmentDuration: data["segmentDuration"] !== undefined ? data["segmentDuration"] : undefined,
  };
}

/**
 * Sprite sheet configuration.
 */
export interface SpriteSheet {
  /**
   * The maximum number of sprites per row in a sprite sheet. The default is 0,
   * which indicates no maximum limit.
   */
  columnCount?: number;
  /**
   * End time in seconds, relative to the output file timeline. When
   * `end_time_offset` is not specified, the sprites are generated until the end
   * of the output file.
   */
  endTimeOffset?: number /* Duration */;
  /**
   * Required. File name prefix for the generated sprite sheets. Each sprite
   * sheet has an incremental 10-digit zero-padded suffix starting from 0 before
   * the extension, such as `sprite_sheet0000000123.jpeg`.
   */
  filePrefix?: string;
  /**
   * Format type. The default is `jpeg`. Supported formats: - `jpeg`
   */
  format?: string;
  /**
   * Starting from `0s`, create sprites at regular intervals. Specify the
   * interval value in seconds.
   */
  interval?: number /* Duration */;
  /**
   * The quality of the generated sprite sheet. Enter a value between 1 and
   * 100, where 1 is the lowest quality and 100 is the highest quality. The
   * default is 100. A high quality value corresponds to a low image data
   * compression ratio.
   */
  quality?: number;
  /**
   * The maximum number of rows per sprite sheet. When the sprite sheet is
   * full, a new sprite sheet is created. The default is 0, which indicates no
   * maximum limit.
   */
  rowCount?: number;
  /**
   * Required. The height of sprite in pixels. Must be an even integer. To
   * preserve the source aspect ratio, set the SpriteSheet.sprite_height_pixels
   * field or the SpriteSheet.sprite_width_pixels field, but not both (the API
   * will automatically calculate the missing field). For portrait videos that
   * contain horizontal ASR and rotation metadata, provide the height, in
   * pixels, per the horizontal ASR. The API calculates the width per the
   * horizontal ASR. The API detects any rotation metadata and swaps the
   * requested height and width for the output.
   */
  spriteHeightPixels?: number;
  /**
   * Required. The width of sprite in pixels. Must be an even integer. To
   * preserve the source aspect ratio, set the SpriteSheet.sprite_width_pixels
   * field or the SpriteSheet.sprite_height_pixels field, but not both (the API
   * will automatically calculate the missing field). For portrait videos that
   * contain horizontal ASR and rotation metadata, provide the width, in pixels,
   * per the horizontal ASR. The API calculates the height per the horizontal
   * ASR. The API detects any rotation metadata and swaps the requested height
   * and width for the output.
   */
  spriteWidthPixels?: number;
  /**
   * Start time in seconds, relative to the output file timeline. Determines
   * the first sprite to pick. The default is `0s`.
   */
  startTimeOffset?: number /* Duration */;
  /**
   * Total number of sprites. Create the specified number of sprites
   * distributed evenly across the timeline of the output media. The default is
   * 100.
   */
  totalCount?: number;
}

function serializeSpriteSheet(data: any): SpriteSheet {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    interval: data["interval"] !== undefined ? data["interval"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
}

function deserializeSpriteSheet(data: any): SpriteSheet {
  return {
    ...data,
    endTimeOffset: data["endTimeOffset"] !== undefined ? data["endTimeOffset"] : undefined,
    interval: data["interval"] !== undefined ? data["interval"] : undefined,
    startTimeOffset: data["startTimeOffset"] !== undefined ? data["startTimeOffset"] : undefined,
  };
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
 * The mapping for the `Job.edit_list` atoms with text `EditAtom.inputs`.
 */
export interface TextMapping {
  /**
   * Required. The `EditAtom.key` that references atom with text inputs in the
   * `Job.edit_list`.
   */
  atomKey?: string;
  /**
   * Required. The `Input.key` that identifies the input file.
   */
  inputKey?: string;
  /**
   * Required. The zero-based index of the track in the input file.
   */
  inputTrack?: number;
}

/**
 * Encoding of a text stream. For example, closed captions or subtitles.
 */
export interface TextStream {
  /**
   * The codec for this text stream. The default is `webvtt`. Supported text
   * codecs: - `srt` - `ttml` - `cea608` - `cea708` - `webvtt`
   */
  codec?: string;
  /**
   * The name for this particular text stream that will be added to the
   * HLS/DASH manifest.
   */
  displayName?: string;
  /**
   * The BCP-47 language code, such as `en-US` or `sr-Latn`. For more
   * information, see
   * https://www.unicode.org/reports/tr35/#Unicode_locale_identifier.
   */
  languageCode?: string;
  /**
   * The mapping for the `Job.edit_list` atoms with text `EditAtom.inputs`.
   */
  mapping?: TextMapping[];
}

/**
 * Video stream resource.
 */
export interface VideoStream {
  /**
   * H264 codec settings.
   */
  h264?: H264CodecSettings;
  /**
   * H265 codec settings.
   */
  h265?: H265CodecSettings;
  /**
   * VP9 codec settings.
   */
  vp9?: Vp9CodecSettings;
}

function serializeVideoStream(data: any): VideoStream {
  return {
    ...data,
    h264: data["h264"] !== undefined ? serializeH264CodecSettings(data["h264"]) : undefined,
    h265: data["h265"] !== undefined ? serializeH265CodecSettings(data["h265"]) : undefined,
    vp9: data["vp9"] !== undefined ? serializeVp9CodecSettings(data["vp9"]) : undefined,
  };
}

function deserializeVideoStream(data: any): VideoStream {
  return {
    ...data,
    h264: data["h264"] !== undefined ? deserializeH264CodecSettings(data["h264"]) : undefined,
    h265: data["h265"] !== undefined ? deserializeH265CodecSettings(data["h265"]) : undefined,
    vp9: data["vp9"] !== undefined ? deserializeVp9CodecSettings(data["vp9"]) : undefined,
  };
}

/**
 * VP9 codec settings.
 */
export interface Vp9CodecSettings {
  /**
   * Required. The video bitrate in bits per second. The minimum value is
   * 1,000. The maximum value is 480,000,000.
   */
  bitrateBps?: number;
  /**
   * Target CRF level. Must be between 10 and 36, where 10 is the highest
   * quality and 36 is the most efficient compression. The default is 21.
   * **Note:** This field is not supported.
   */
  crfLevel?: number;
  /**
   * Required. The target video frame rate in frames per second (FPS). Must be
   * less than or equal to 120. Will default to the input frame rate if larger
   * than the input frame rate. The API will generate an output FPS that is
   * divisible by the input FPS, and smaller or equal to the target FPS. See
   * [Calculating frame
   * rate](https://cloud.google.com/transcoder/docs/concepts/frame-rate) for
   * more information.
   */
  frameRate?: number;
  /**
   * Select the GOP size based on the specified duration. The default is `3s`.
   * Note that `gopDuration` must be less than or equal to
   * [`segmentDuration`](#SegmentSettings), and
   * [`segmentDuration`](#SegmentSettings) must be divisible by `gopDuration`.
   */
  gopDuration?: number /* Duration */;
  /**
   * Select the GOP size based on the specified frame count. Must be greater
   * than zero.
   */
  gopFrameCount?: number;
  /**
   * The height of the video in pixels. Must be an even integer. When not
   * specified, the height is adjusted to match the specified width and input
   * aspect ratio. If both are omitted, the input height is used. For portrait
   * videos that contain horizontal ASR and rotation metadata, provide the
   * height, in pixels, per the horizontal ASR. The API calculates the width per
   * the horizontal ASR. The API detects any rotation metadata and swaps the
   * requested height and width for the output.
   */
  heightPixels?: number;
  /**
   * Pixel format to use. The default is `yuv420p`. Supported pixel formats: -
   * `yuv420p` pixel format - `yuv422p` pixel format - `yuv444p` pixel format -
   * `yuv420p10` 10-bit HDR pixel format - `yuv422p10` 10-bit HDR pixel format -
   * `yuv444p10` 10-bit HDR pixel format - `yuv420p12` 12-bit HDR pixel format -
   * `yuv422p12` 12-bit HDR pixel format - `yuv444p12` 12-bit HDR pixel format
   */
  pixelFormat?: string;
  /**
   * Enforces the specified codec profile. The following profiles are
   * supported: * `profile0` (default) * `profile1` * `profile2` * `profile3`
   * The available options are
   * [WebM-compatible](https://www.webmproject.org/vp9/profiles/). Note that
   * certain values for this field may cause the transcoder to override other
   * fields you set in the `Vp9CodecSettings` message.
   */
  profile?: string;
  /**
   * Specify the `rate_control_mode`. The default is `vbr`. Supported rate
   * control modes: - `vbr` - variable bitrate
   */
  rateControlMode?: string;
  /**
   * The width of the video in pixels. Must be an even integer. When not
   * specified, the width is adjusted to match the specified height and input
   * aspect ratio. If both are omitted, the input width is used. For portrait
   * videos that contain horizontal ASR and rotation metadata, provide the
   * width, in pixels, per the horizontal ASR. The API calculates the height per
   * the horizontal ASR. The API detects any rotation metadata and swaps the
   * requested height and width for the output.
   */
  widthPixels?: number;
}

function serializeVp9CodecSettings(data: any): Vp9CodecSettings {
  return {
    ...data,
    gopDuration: data["gopDuration"] !== undefined ? data["gopDuration"] : undefined,
  };
}

function deserializeVp9CodecSettings(data: any): Vp9CodecSettings {
  return {
    ...data,
    gopDuration: data["gopDuration"] !== undefined ? data["gopDuration"] : undefined,
  };
}

/**
 * Yet Another Deinterlacing Filter Configuration.
 */
export interface YadifConfig {
  /**
   * Deinterlace all frames rather than just the frames identified as
   * interlaced. The default is `false`.
   */
  deinterlaceAllFrames?: boolean;
  /**
   * Disable spacial interlacing. The default is `false`.
   */
  disableSpatialInterlacing?: boolean;
  /**
   * Specifies the deinterlacing mode to adopt. The default is `send_frame`.
   * Supported values: - `send_frame`: Output one frame for each frame -
   * `send_field`: Output one frame for each field
   */
  mode?: string;
  /**
   * The picture field parity assumed for the input interlaced video. The
   * default is `auto`. Supported values: - `tff`: Assume the top field is first
   * - `bff`: Assume the bottom field is first - `auto`: Enable automatic
   * detection of field parity
   */
  parity?: string;
}