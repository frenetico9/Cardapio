// api/admin/update-app-data.ts
import { VercelRequest, VercelResponse } from '@vercel/node';
import { put } from '@vercel/blob';
import type { MenuItem, Coupon } from '../../types'; // Ajuste o caminho

const APP_DATA_BLOB_FILENAME = 'app_data.json';

interface AppDataPayload {
  menuItems: MenuItem[];
  coupons: Coupon[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle OPTIONS preflight request for CORS
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Or your specific frontend origin
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Admin-API-Secret');
    res.status(204).end(); // 204 No Content
    return;
  }

  // 1. Autenticação (Simples - Chave Secreta)
  const clientSecret = req.headers['x-admin-api-secret'];
  const serverSecret = process.env.ADMIN_API_SECRET;

  if (!serverSecret) {
    console.error("ADMIN_API_SECRET is not set in environment variables.");
    return res.status(500).json({ message: "Configuration error on server." });
  }
  if (!clientSecret || clientSecret !== serverSecret) {
    return res.status(401).json({ message: 'Unauthorized: Missing or invalid API secret.' });
  }

  // 2. Validação do Método e Corpo da Requisição
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']); // Include OPTIONS in Allow header
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { menuItems, coupons } = req.body as AppDataPayload;

  if (!Array.isArray(menuItems) || !Array.isArray(coupons)) {
    return res.status(400).json({ message: 'Invalid payload: menuItems and coupons must be arrays.' });
  }

  // 3. Preparar e Salvar os Dados no Vercel Blob
  try {
    const dataToStore: AppDataPayload = {
      menuItems,
      coupons,
    };
    const jsonDataString = JSON.stringify(dataToStore, null, 2); // Pretty print JSON

    const blob = await put(APP_DATA_BLOB_FILENAME, jsonDataString, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false, 
    });

    console.log(`App data successfully saved to Blob: ${blob.url}`);
    return res.status(200).json({ message: 'App data updated successfully.', url: blob.url });

  } catch (error: any) {
    console.error('Error saving app data to Vercel Blob:', error);
    return res.status(500).json({ message: 'Failed to save app data.', error: error.message });
  }
}