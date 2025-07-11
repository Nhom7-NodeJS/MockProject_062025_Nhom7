export function normalizeFormDataBody(body: any): any {
  const parsed = { ...body };

  // Convert boolean fields from string
  if (parsed.is_deleted === 'true' || parsed.is_deleted === 'false') {
    parsed.is_deleted = parsed.is_deleted === 'true';
  }

  // Convert attached_file from string to array
  if (parsed.attached_file) {
    try {
     
      parsed.attached_file = JSON.parse(parsed.attached_file);
    } catch {
    
      parsed.attached_file = Array.isArray(parsed.attached_file)
        ? parsed.attached_file
        : [parsed.attached_file];
    }
  }

 
  if (parsed.time_publish && typeof parsed.time_publish === 'string') {
    parsed.time_publish = new Date(parsed.time_publish).toISOString();
  }

  return parsed;
}
