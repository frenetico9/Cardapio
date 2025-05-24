
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
  // 1. Autenticação (Simples - Chave Secreta)
  // Em um app real, use um método mais robusto (ex: JWT, OAuth)
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
    res.setHeader('Allow', ['POST']);
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

    // O Vercel Blob `put` irá sobrescrever o arquivo se ele já existir com o mesmo pathname.
    // `addRandomSuffix: false` é importante aqui para garantir que o nome do arquivo seja sempre o mesmo.
    // `access: 'public'` para que a função `/api/app-data` (e qualquer cliente direto, se desejado) possa ler.
    const blob = await put(APP_DATA_BLOB_FILENAME, jsonDataString, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: false, // Garante que o nome do arquivo seja previsível
    });

    console.log(`App data successfully saved to Blob: ${blob.url}`);
    return res.status(200).json({ message: 'App data updated successfully.', url: blob.url });

  } catch (error: any) {
    console.error('Error saving app data to Vercel Blob:', error);
    return res.status(500).json({ message: 'Failed to save app data.', error: error.message });
  }
}
