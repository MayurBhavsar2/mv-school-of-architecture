import QRCode from 'qrcode';

export interface AssetQRData {
  assetId: string;
  assetName: string;
  assetType: string;
  category: string;
  registrationDate: string;
}

export const generateAssetQRCode = async (assetData: AssetQRData): Promise<string> => {
  try {
    const qrData = JSON.stringify(assetData);
    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    });
    return qrCodeDataURL;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};

export const parseAssetQRData = (qrData: string): AssetQRData | null => {
  try {
    return JSON.parse(qrData) as AssetQRData;
  } catch (error) {
    console.error('Error parsing QR data:', error);
    return null;
  }
};

export const generateAssetId = (): string => {
  return `AST-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
};