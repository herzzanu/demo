import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    return [
      {
        id: 1,
        name: 'smss.exe',
        device: 'Mario',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\smss.exe',
        status: 'scheduled',
      },
      {
        id: 2,
        name: 'netsh.exe',
        device: 'Luigi',
        path: '\\Device\\HarddiskVolume2\\Windows\\System32\\netsh.exe',
        status: 'available',
      },
      {
        id: 3,
        name: 'uxtheme.dll',
        device: 'Peach',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\uxtheme.dll',
        status: 'available',
      },
      {
        id: 4,
        name: 'aries.sys',
        device: 'Daisy',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\aries.sys',
        status: 'scheduled',
      },
      {
        id: 5,
        name: 'cryptbase.dll',
        device: 'Yoshi',
        path: '\\Device\\HarddiskVolume1\\Windows\\System32\\cryptbase.dll',
        status: 'scheduled',
      },
      {
        id: 6,
        name: '7za.exe',
        device: 'Toad',
        path: '\\Device\\HarddiskVolume1\\temp\\7za.exe',
        status: 'scheduled',
      },
    ];
  }
}
