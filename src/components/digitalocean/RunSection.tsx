import LoginBox from '../mocks/LoginBox'
import {
  Section,
  SectionTitle,
  SectionSubtitle,
  ProductSummary,
  ProductIntro,
  ProductIntroHeading,
  ProductIntroContent,
  ProductContent,
} from './Sections'

export function RunSection() {
  return (
    <Section>
      <SectionTitle>Run</SectionTitle>
      <SectionSubtitle>Signup, logout, logout and show user profile.</SectionSubtitle>
      <ProductSummary gridCols={2}>
        <ProductIntro>
          <ProductIntroHeading>Let customers auth your app</ProductIntroHeading>
          <ProductIntroContent>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-slate-400">
              No matter what DO computer services you chose for your app, your app is now auth
              enabled and ready to serve your customers.
            </p>
          </ProductIntroContent>
        </ProductIntro>
        <ProductContent className="hidden lg:block">
          <LoginBox />
        </ProductContent>
      </ProductSummary>
    </Section>
  )
}
