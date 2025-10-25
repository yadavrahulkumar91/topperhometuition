// firebase/admin.js
import admin from "firebase-admin";

const serviceAccount = {
  type: "service_account",
  project_id: "topper-home-tuition",
  private_key_id: "135f098d118cc598f712ad619a690ea871d79e81",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2kwM+qgNw+3iX\nwAIzA1ywdCbETagPk7+RbdYnG580G8UO2lrsaOPBepstl4anHgoz+MkUXMbJlMUd\nazpVdSlwCToBA1YYNUjvV/HMVONBzpYvR8iO8WqIwHwA7gQsTtfbQ0hnv684rtts\n04R62e13XI3q4gFT69+/wrQJRyQ+k3VCDLkRie/jxTj9Bhz/RnSZGk9uP/ZMyc5Z\n5WShPVtYZqIgMaPAr2+42zHAdZqqlRSHNkKIjK4+HXfqGR7YrYTcrXP+0SZ5NA+L\nFAtXYZd25q7v562vHdiHmLH5lVZB5zSbQVpMLu//Qh7pG8RtJgiMLjFuK8npWu7U\nDbKMlmSjAgMBAAECgf96uJ1Di+sAf0mBEcGp8gIBdrxb9fUp2Kj2HULGwJMp0vQ0\nDLBIfwGJysH3fwX+zMj/3/R2rGisWFjHgaZzFkPnZW9vo0bwcjYRzu1uBzzs/wk1\nw79STA1QLw01Vovl+0ttRCcC1ytA+LaZsU2h5wzu/GrC4OuBDx/ZxgFwi2ZoEdiz\n49XAipT8yNdd47U/pdK9+fyOOXF5M6jONCw3EIXTBnz9vGLaa22jxVLX9QZ/4aeH\ndtxEPBNaJTahmSmz2iczRbzJYiUaGtKGxevurGGg4fTIj0c3yvqNi81g/27Rrsm6\nKw4RwiKOAQoPQ/cmHHkjMdZ+OCwDY8TiMxIUmAECgYEA7NYdTUvZ0hE43LYBJFOo\nB8Bb7CwQeDCPOGgyWCrAzrimsCbq6W+ZebLjepjFg0hYYp7sTAbxtvnAXiF87MHC\nXsU2v6/cp2kLndvlSpLtyeOG/ALEGSSDzAMUITt7X9gA/9x/6607gP8rdyK0qt7d\nO908P/Clelb3e0btbaEr6IECgYEAxVjmVjGGjCVmwIPy3KpcP0ksRKeeSKccx7K4\nPom0+cyk/lFFYP7Z+eb0eUZWNTd3RgllVCKwZKEWt4yJXbfyP2vN3u0VW0c1274T\n8x3DJZJPZeNUJRdNRXgRoWTQ/tqWdIOxN21RaJV3wVmrJXuPQRUvjxEonik1zXTY\nOloQGyMCgYEAleZPVYUUsKjF3Kw1vNBWIdHWXHznT6ssev84HiWxMyYcGpIHTQid\nkzFuWUIogRdhGcqMtPIQO0eIQgvgDdn1NBaOuHSOrEcIWzm6vqCQcJ/Z59e4VlGO\nOaoZK4+CXv9QYqElNf3HE7ZtxFHrF9tHG4TDhZTCp9Qzf4s8645/RAECgYEAhDI6\nEdEZPTYsr5d0D4d7RdWBdvgFmst/BvLcYuAiQBdrCwVsAT6Wy8V/TOHmC739Awh2\nPTcDjFUwf4H/3qzC9OMFRGjynnOES4/3kysDt15cG3d9vV7vnzKANOnw6leI48H3\n65YqK3G8h+PGNtSfMMy9UAwBdnlKljfIRMZh9ZsCgYAmo8m7HZP8ml0dukTQHlvV\nBq73M/o2r+N8o64IzPQQ3wHcD7DmhDJ3gaF1Gkzwi9AGZ7nNw5PPECeAZ2l0COwn\nvtD8JnAsw2XM389xUHUaXiy50i+c8ZXAoSKFv4P8XlgZ3ZfEvXdj+R6rP6b+Hn9N\nHUnGZ+nEN5i4AuIS2yObPA==\n-----END PRIVATE KEY-----\n",
  client_email:
    "firebase-adminsdk-fbsvc@topper-home-tuition.iam.gserviceaccount.com",
  client_id: "108854056029707467556",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40topper-home-tuition.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "topper-home-tuition.firebasestorage.app",
  });
}

// Export Storage bucket
export const bucket = admin.storage().bucket();

// Export Firestore database (NEW - add this)
export const adminDb = admin.firestore();

// Default export for backwards compatibility
export default bucket;
