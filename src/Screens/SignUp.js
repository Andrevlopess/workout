import { Box, Input, Pressable, Text } from "native-base";
import { Formik } from "formik";
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: Yup.string().required(),
  });



export default (props) => {

  return (
    <Box padding={3} flex={1}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Text color="black" fontSize="5xl" fontWeight="bold">
          Cadastro
        </Text>
      </Box>
      <Box flex={2} justifyContent="flex-end" py={5}>
        <Box>
          <Formik
          initialValues={{name:'', email: '', password: '', confirmPassword:''}}
          validationSchema={SignupSchema}
          onSubmit={values => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values, touched, errors }) => (
              <>
                {touched.name && errors.name &&
                  <Text color="black">Erro no nome</Text> 
                }
                {touched.email && errors.email &&
                  <Text color="black">Erro no email</Text> 
                }
                <Input
                  variant="underlined"
                  placeholder="Nome"
                  fontSize="lg"
                  color="black"
                  marginBottom={5}
                  fontWeight="semibold"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <Input
                  variant="underlined"
                  placeholder="Email"
                  fontSize="lg"
                  color="black"
                  marginBottom={5}
                  fontWeight="semibold"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <Input
                  variant="underlined"
                  placeholder="Senha"
                  fontSize="lg"
                  color="black"
                  marginBottom={5}
                  fontWeight="semibold"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <Input
                  variant="underlined"
                  placeholder="Confirmar Senha"
                  fontSize="lg"
                  color="black"
                  fontWeight="semibold"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                />
                <Pressable
                  justifyContent="center"
                  alignItems="center"
                  bgColor="indigo.600"
                  rounded="md"
                  p={8}
                  marginY={5}
                  onPress={handleSubmit} 
                >
                  <Text fontSize="2xl">Cadastrar</Text>
                </Pressable>
              </>
            )}
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};
