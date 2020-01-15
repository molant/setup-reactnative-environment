// node > 8.3

if(process.platform !== 'win32') {
    throw new Error('NOT_WINDOWS');
}

if(process.arch !== 'x64') {
    throw new Error('NOT_X64');
}

console.log('Everything OK');
