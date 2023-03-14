export function getHost({ protocol = true }: { protocol: boolean }) {
  if (protocol) {
    return process.env.NEXT_HOST
  } else {
    return process.env.NEXT_HOSTNAME
  }
}

export function getCrossidManagementHost() {
  return process.env.NEXT_PUBLIC_CID_MANAGEMENT
}

export function crossidPublicDomain() {
  return process.env.NEXT_PUBLIC_DOMAIN
}
