import {
  Feature,
  FeatureList,
  Features,
  FeaturesInfo,
  FeaturesLayout,
  HeroDiagram,
  HeroInfo,
  HeroLayout,
  HeroSubtitle,
  HeroTitle,
  LargeFeature,
  Section1Left,
  Section1LeftContentFeatures,
  Section1LeftContentLayout,
  Section1LeftContentTitle,
  Section1Right,
  Section2,
  Section2Content,
  Section2Features,
  Section2Right,
  Section2SubTitle,
  Section2Title,
  TwoSections,
} from '@/components/FeaturePages'
import { features } from '@/data/features'
import Head from 'next/head'
import Image from 'next/image'

// screenshots
import HeroScreenshot from '@/images/features/user_management/hero.png'
import AddRuleScreenshot from '@/images/features/user_management/add_rule.png'
import RBACScreenshot from '@/images/features/user_management/group_entitlements.png'

const feature = features.filter((f) => f.id == 'user-management')[0]

const Hero = () => (
  <HeroLayout>
    <HeroInfo>
      <HeroTitle title={feature.title} />
      <HeroSubtitle subtitle={feature.description} />
    </HeroInfo>
    <HeroDiagram>
      <Image
        className="rounded-md object-cover object-left-top"
        src={HeroScreenshot}
        alt="Product Screenshot"
      />
    </HeroDiagram>
  </HeroLayout>
)

const storePrimaryFeatures =
  feature.features?.store.filter((f) => f.tags && f.tags.indexOf('primary') > -1) || []
const storeSecondaryFeatures =
  feature.features?.store.filter((f) => !f.tags || f.tags.indexOf('primary') === -1) || []

const FeaturesSection = () => (
  <FeaturesLayout>
    <FeaturesInfo
      caption="Securely store anything"
      title="Unified Store"
      subtitle="Store and manage users, groups or any other IAM related objects."
    />
    <FeatureList>
      <Features features={storePrimaryFeatures} gridRows="sm:grid-rows-2" />
      <Features features={storeSecondaryFeatures} secondary gridRows="sm:grid-rows-2" />
    </FeatureList>
  </FeaturesLayout>
)

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
          <TwoSections>
            {/* AccessControl */}
            <Section1Left>
              <Section1LeftContentLayout>
                <Section1LeftContentTitle
                  title="Simple, yet powerful dynamic rules"
                  //   subtitle=""
                />
                <Section1LeftContentFeatures>
                  {feature.features?.rules.map((f) => (
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
                <Image src={AddRuleScreenshot} alt="Rules Screenshot" />
              </Section1Right>
            </Section1Left>
            {/* Rules */}
            <Section2>
              <Section2Content>
                <Section2Title content="Lightweight Groups" />
                <Section2SubTitle content="Build business functional groups to abstract technical entitlements without RBAC hassle." />
                <Section2Features>
                  {feature.features?.rbac.map((f) => (
                    <LargeFeature key={f.title} {...f} />
                  ))}
                </Section2Features>
              </Section2Content>
              <Section2Right>
                <Image
                  className="relative mx-auto"
                  width="600"
                  src={RBACScreenshot}
                  alt="RBAC screenshot"
                />
              </Section2Right>
            </Section2>
          </TwoSections>

          {/* <div className="relative py-16 sm:py-24 lg:py-36"></div> */}
        </main>
      </div>
    </>
  )
}
