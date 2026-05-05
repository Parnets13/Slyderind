module.exports = {
  apps: [{
    name: 'slyder-backend',
    script: './app.js',
    instances: 1,
    exec_mode: 'fork',
    watch: false,
    max_restarts: 3,
    min_uptime: '10s',
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'production',
    },
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
    autorestart: true,
    restart_delay: 4000,
  }]
}
