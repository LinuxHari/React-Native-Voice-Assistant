import styles from '@/styles/HeaderStyle'
import React from 'react'
import { Image, Text, View } from 'react-native'

type HeaderSectionProps = {
    title: string;
    description: string;
}

const HeaderSection = ({ title, description }: HeaderSectionProps) => {
  return (
    <View style={styles.assistantBox}>
        <Image
          source={require("../assets/images/bot.png")}
          style={styles.botIcon}
        />
        <View>
          <Text style={styles.assistantTextBold}>{title}</Text>
          <Text style={styles.assistantText}>{description}</Text>
        </View>
      </View>
  )
}

export default HeaderSection