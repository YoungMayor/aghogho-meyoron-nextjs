import { sendTelegramNotification } from '../lib/utils/telegram';

// Load environment variables
try {
  process.loadEnvFile();
} catch (error) {
  // Fallback for older Node versions or if file doesn't exist (though .env is expected)
  console.warn('Could not load .env file directly:', error);
}

async function main() {
  // Get message from command line arguments
  // args are: node script.ts [message]
  // With tsx: tsx script.ts [message]
  // process.argv[2] is the first argument after the script file

  const customMessage = process.argv[2];

  const message = customMessage
    ? `🔔 *Manual Ping*\n\n${customMessage}`
    : `🔔 *Manual Ping*\n\nSystem test at ${new Date().toLocaleString()}`;

  console.log('Sending Telegram notification...');
  console.log('Message:', message);

  const success = await sendTelegramNotification(message);

  if (success) {
    console.log('✅ Notification sent successfully!');
  } else {
    console.error('❌ Failed to send notification.');
    process.exit(1);
  }
}

main().catch(console.error);
