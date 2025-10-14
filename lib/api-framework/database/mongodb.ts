import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (isConnected) {
    return mongoose;
  }

  try {
    if (!process.env.CONNECTION_URL) {
      throw new Error('CONNECTION_URL não definida no arquivo .env');
    }

    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;

    const db = await mongoose.connect(process.env.CONNECTION_URL, options);
    
    isConnected = db.connections[0].readyState === 1;
    
    console.log('📦 Conectado ao MongoDB');
    
    return db;
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  if (!isConnected) {
    return;
  }

  try {
    await mongoose.disconnect();
    isConnected = false;
    console.log('📦 Desconectado do MongoDB');
  } catch (error) {
    console.error('❌ Erro ao desconectar do MongoDB:', error);
    throw error;
  }
}

export function getDatabaseStatus(): boolean {
  return isConnected;
}

mongoose.connection.on('connected', () => {
  isConnected = true;
  console.log('📦 Evento: Conectado ao MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Evento: Erro na conexão MongoDB:', err);
  isConnected = false;
});

mongoose.connection.on('disconnected', () => {
  console.log('📦 Evento: Desconectado do MongoDB');
  isConnected = false;
});

process.on('SIGINT', async () => {
  await disconnectFromDatabase();
  process.exit(0);
});
