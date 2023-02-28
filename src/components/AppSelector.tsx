interface IOauth2Client {
  clientId: string
  redirectUrls: string[]
  logoutUrls: string[]
}

export interface IApp {
  id: string
  displayName: string
  oauth2Client: IOauth2Client
}

const MOCKS: IApp[] = [
  {
    id: 'app1',
    displayName: 'App 1',
    oauth2Client: {
      clientId: 'clientidddd1',
      redirectUrls: ['http://login1..'],
      logoutUrls: ['http://logout1..'],
    },
  },
  {
    id: 'app2',
    displayName: 'App 2',
    oauth2Client: {
      clientId: 'clientidddd2',
      redirectUrls: ['http://login2..'],
      logoutUrls: ['http://logout2..'],
    },
  },
]

// TODO replace this component with a real one
export default function AppSelector({ onChange }: { onChange: Function }) {
  return (
    <select
      onChange={(e) => {
        onChange(MOCKS.find((app) => app.id === e.target.value))
      }}
    >
      <option value={''}>--select--</option>
      {MOCKS.map((a) => (
        <option value={a.id} key={a.id}>
          {a.displayName}
        </option>
      ))}
    </select>
  )
}
