
// Simple password hashing and validation functions
// In a real application, use a proper crypto library

/**
 * Hash a password (simplified version)
 * In a real app, use bcrypt or another proper hashing algorithm
 */
export async function hash(password: string): Promise<string> {
  // This is a very simplified hash function
  // DO NOT use this in production - use proper crypto libraries instead
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "salt-for-example");
  
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
  return hashHex;
}

/**
 * Verify a password against a hash (simplified version)
 * In a real app, use bcrypt or another proper hashing algorithm
 */
export async function verify(password: string, hashedPassword: string): Promise<boolean> {
  const generatedHash = await hash(password);
  return generatedHash === hashedPassword;
}
