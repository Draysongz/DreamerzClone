import { Box, Flex, Text, Icon, Image} from "@chakra-ui/react"
import star from '../../public/star.png'
import { BsCurrencyDollar } from "react-icons/bs";
import { FaBell } from "react-icons/fa";
import { HiUser } from "react-icons/hi2";
import { IoMdHelpCircle } from "react-icons/io";



export default function Header() {
    return(
        <Box
        display={'flex'}
        width={'100%'}
        height={'80px'}
        bgColor={'white'}
        justifyContent={'space-between'}
        alignItems={'center'}
        >
            <Box
            display={'flex'}
            gap={2}
            alignItems={'center'}>

            <Flex
            alignItems={'center'}
            gap={2}
            border={'1px solid rgba(0, 0, 0, 0.3)'}
            p={{base: '2.5px 5px', sm: '5px 10px'}}
            borderRadius={'20px'}>
                <Image src={star}
                width={{base: 4, sm: 6 }}
                mt={{base: 0.5, sm: 0}}
                />
                <Text
                alignItems={'center'}
                display={'flex'}
                fontWeight={600}
                gap={1}
                fontSize={{base: '14px', sm: '16px'}}>
                    1,000
                    <span
                    className="text-blue-500">
                        XP
                    </span>
                </Text>
            </Flex>

            <Flex
            alignItems={'center'}                
            border={'1px solid rgba(0, 0, 0, 0.3)'}
            borderRadius={'20px'}
            p={{base: '4px 7px' ,sm:'5px 10px'}}
            gap={1}>
                <Icon as={BsCurrencyDollar}
                width={{base: 4, sm: 10}}
                height={{base: 4, sm: 10}}
                boxSize={{base: 4, sm: 5}}
                borderRadius={'20px'}
                />
                <Text
                fontWeight={600}
                fontSize={{base: '14px', sm: '16px'}}

                >
                    0.00</Text>
            </Flex>
            </Box>

            <Flex
            alignItems={'center'}
            gap={3}>
                <Icon as={IoMdHelpCircle}
                width={{base: 7, sm: 12}}
                height={{base: 7, sm: 12}}
                boxSize={{base: 7, sm: 10}}
                p={'5px'}
                color={'rgba(0, 0, 0, 0.3)'}
                border={'1px solid rgba(0, 0, 0, 0.3)'}
                borderRadius={'20px'}/>
                <Icon as={FaBell} 
                width={{base: 7, sm: 12}}
                height={{base: 7, sm: 12}}
                boxSize={{base: 7, sm: 9}}
                border={'1px solid rgba(0, 0, 0, 0.3)'}
                borderRadius={'20px'}
                p={'5px'}
                color={'rgba(0, 0, 0, 0.3)'}/>
                <Flex 
                position={'relative'}>
                <Icon as={HiUser} 
                width={{base: 11, sm: 18}}
                height={{base: 11, sm: 18}}
                boxSize={{base: 8, sm: 12}}
                border={'1px solid rgba(0, 0, 0, 0.3)'}
                borderRadius={'50%'}
                p={'5px'}
                color={'rgba(0, 0, 0, 0.3)'}/>
                {/* <Text
                position={'absolute'}
                bg={'rgba(0, 0, 0, 0.2)'}
                fontSize={'10px'}
                bottom={'-12px'}
                left={'11px'}
                fontWeight={700}
                p={'2px'}
                color={'rgba(0, 0, 0, 0.6)'}>
                    5638
                </Text> */}
                </Flex>
            </Flex>

        </Box>
    )
}