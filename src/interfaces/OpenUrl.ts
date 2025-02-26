interface OpenUrl {
  ctx_ver?: string, // ContextObject version
  rft_val_fmt?: string, // Format of the metadata
  rft_id?: string, // Resource identifier (e.g., DOI, URL)
  [key: string]: string | undefined, // Any other metadata, eg 'rft.title'
}

export default OpenUrl;
