import {
  FeaturesLayout,
  FeaturesInfo,
  HeroLayout,
  HeroInfo,
  HeroDiagram,
  HeroSubtitle,
  HeroTitle,
  Feature,
  Features,
  FeatureList,
  TwoSections,
  Section1Left,
  Section1LeftContentLayout,
  Section1LeftContentTitle,
  Section1LeftContentFeatures,
  Section1Right,
  Section2,
  Section2Content,
  Section2Title,
  Section2SubTitle,
  Section2Features,
  Section2Right,
  LargeFeature,
  ProductFeaturesWithScreenshot,
} from '@/components/FeaturePages'
import { features } from '@/data/enterprise_features'
import Head from 'next/head'
import Image from 'next/image'
import Carousel from '@/components/Carousel'

// images
import HeroScreenshot from '@/images/enterprise/features/recertification/portal_review_simplified.png'
import PortalInbox from '@/images/enterprise/features/recertification/portal_inbox.png'
import PortalMultiTasksReview from '@/images/enterprise/features/recertification/portal_certify_multi.png'
import AdminStoriesScreenshot from '@/images/enterprise/features/recertification/admin_stories.png'
import AdminCampaignScreenshot from '@/images/enterprise/features/recertification/admin_campaign.png'

const feature = features.filter((f) => f.id == 'recertification')[0]

const Hero = () => (
  <HeroLayout>
    <HeroInfo>
      <HeroTitle title={feature.title} />
      <HeroSubtitle subtitle={feature.description} />
    </HeroInfo>
    <HeroDiagram noAspect>
      <Image
        className="rounded-md object-cover object-left-top"
        src={HeroScreenshot}
        alt="Product Screenshot"
      />
    </HeroDiagram>
  </HeroLayout>
)

const primaryFeatures =
  feature.features?.general.filter((f) => f.tags && f.tags.indexOf('primary') > -1) || []
const moreFeatures =
  feature.features?.general.filter((f) => !f.tags || f.tags.indexOf('primary') === -1) || []

const FeaturesSection = () => (
  <FeaturesLayout>
    <FeaturesInfo
      caption="Certify, everything."
      title="Streamline Recertification"
      subtitle="Streamline the entire process of entitlements recertification."
    />
    <FeatureList>
      <Features features={primaryFeatures} gridRows="sm:grid-rows-3" />
      <Features features={moreFeatures} secondary gridRows="sm:grid-rows-2" />
    </FeatureList>
  </FeaturesLayout>
)

const PortalFeatures = () => {
  return (
    <ProductFeaturesWithScreenshot
      caption="Reviewers Portal"
      title="Simplified Experience"
      description="Enhnaced experience of the review process drastically affects the effort result."
      features={feature.features?.portal || []}
    >
      <div className="mx-auto align-middle">
        <Carousel indicatorClassName="bg-indigo-500 dark:bg-sky-500">
          <Image src={PortalInbox} alt="Portal Inbox Screenshot" />
          <Image src={PortalMultiTasksReview} alt="Portal Review Screenshot" />
        </Carousel>
      </div>
    </ProductFeaturesWithScreenshot>
  )
}

/*
// we generalized both of these into Section1,2 but they don't look as good as this :/
// (especially the campaign section)
const StoriesSection = () => {
  return (
    <ProductWithScreenshotOnLeftLargeBullets
      title="Story for any scenario"
      description="Certify any entitlement such app groups, IAM roles and devices."
      features={feature.features?.stories || []}
    >
      <Image
        className="relative mx-auto"
        width="600"
        src={AdminStoriesScreenshot}
        alt="Stories screenshot"
      />
    </ProductWithScreenshotOnLeftLargeBullets>
  )
}

function CampaignSection() {
  return (
    <>
      <div className="relative mx-auto max-w-xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mb-8 overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-slate-300 sm:text-5xl">
                  Campaign Overview
                </h1>
              </div>
              <div className="mt-20 grid gap-5">
                {feature.features?.campaign.map((f) => (
                  <Feature key={f.title} title={f.title} description={f.description} />
                ))}
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl lg:left-80 lg:right-0 lg:w-full"></div>
                <svg
                  className="absolute right-1/2 top-8 -mr-3 lg:left-0 lg:m-0"
                  width="404"
                  height="392"
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x="0"
                      y="0"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="4"
                        height="4"
                        className="text-gray-200 dark:text-slate-800"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width="404"
                    height="392"
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                  />
                </svg>
              </div>
              <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <Image
                  className="relative mx-auto"
                  width="600"
                  src={AdminCampaignScreenshot}
                  alt="Campaign screenshot"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <svg
        className="absolute right-full hidden translate-x-1/2 translate-y-12 transform lg:block"
        width="404"
        height="784"
        viewBox="0 0 404 784"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              className="text-gray-200 dark:text-slate-800"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect width="404" height="784" fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)" />
      </svg>
    </>
  )
}
*/

export default function Page() {
  return (
    <>
      <Head>
        <title>{feature.title}</title>
        <meta name="description" content={feature.description} />
      </Head>
      <div className="bg-white dark:bg-slate-900">
        <main className="antialiased">
          <Hero />
          <FeaturesSection />
          {/* <div className="overflow-hidden py-16 lg:py-24"> */}
          <PortalFeatures />
          <TwoSections>
            {/* Admin : Stories */}
            <Section1Left>
              <Section1LeftContentLayout>
                <Section1LeftContentTitle
                  title="Story for any scenario"
                  subtitle="Certify any entitlement such app groups, IAM roles and devices."
                />
                <Section1LeftContentFeatures>
                  {feature.features?.stories.map((f) => (
                    <Feature
                      key={f.title}
                      title={f.title}
                      description={f.description}
                      icon={f.icon}
                    />
                  ))}
                </Section1LeftContentFeatures>
              </Section1LeftContentLayout>
              <Section1Right>
                <Image src={AdminStoriesScreenshot} alt="Stories Screenshot" />
              </Section1Right>
            </Section1Left>
            {/* Admin : Campaign */}
            <Section2>
              <Section2Content>
                <Section2Title content="Campaign Overview" />
                <Section2SubTitle content="All data in a single glance" />
                <Section2Features>
                  {feature.features?.campaign.map((f) => (
                    <LargeFeature key={f.title} {...f} />
                  ))}
                </Section2Features>
              </Section2Content>
              <Section2Right>
                <Image
                  className="relative mx-auto"
                  width="600"
                  src={AdminCampaignScreenshot}
                  alt="Groups screenshot"
                />
              </Section2Right>
            </Section2>
          </TwoSections>
          {/* <CampaignSection /> */}
          {/* </div> */}
          <div className="relative py-16 sm:py-24 lg:py-28"></div>
        </main>
      </div>
    </>
  )
}
